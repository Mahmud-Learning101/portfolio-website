import mongoose from 'mongoose';

/**
 * Serverless Cached Mongoose Connection Manager
 * Prevents connection explosion in serverless environments (Vercel Lambdas)
 * by caching the active Mongoose connection in the global execution context.
 */

declare global {
  // eslint-disable-next-line no-var
  var mongooseCached: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

let cached = global.mongooseCached;

if (!cached) {
  cached = global.mongooseCached = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((error) => {
      cached!.promise = null;
      console.error('❌ MongoDB connection error:', error);
      throw error;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export async function checkDbHealth(): Promise<{ status: 'healthy' | 'unhealthy'; error?: string }> {
  try {
    const conn = await connectToDatabase();
    const state = conn.connection.readyState;
    // 1 = connected, 2 = connecting
    if (state === 1 || state === 2) {
      return { status: 'healthy' };
    }
    return { status: 'unhealthy', error: `MongoDB state code: ${state}` };
  } catch (error: unknown) {
    return { status: 'unhealthy', error: error instanceof Error ? error.message : 'Unknown database error' };
  }
}
