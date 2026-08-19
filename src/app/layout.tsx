import type { Metadata } from "next";
import "./globals.css";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "S. M. Mahmud Bin Murad | Marketing & Content Strategist | Project Manager",
  description:
    "Portfolio of S. M. Mahmud Bin Murad - Marketing & Content Strategist, Project Manager, and Business Solutions Consultant specializing in AI Operations, BPO Leadership, and Financial Analytics.",
  keywords: [
    "S. M. Mahmud Bin Murad",
    "Marketing Strategist",
    "Project Manager",
    "Business Solutions Consultant",
    "AI Operations",
    "BPO Leadership",
    "Financial Analyst",
    "Dhaka",
  ],
  authors: [{ name: "S. M. Mahmud Bin Murad" }],
  openGraph: {
    title: "S. M. Mahmud Bin Murad | Executive Portfolio",
    description:
      "Curiosity-driven strategist bridging marketing, AI operations, financial modeling, and business solution consulting.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#070B19] text-slate-100 antialiased selection:bg-[#0066FF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
