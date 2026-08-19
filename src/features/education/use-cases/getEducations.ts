import { connectToDatabase } from '@/shared/lib/db';
import { EducationModel } from '../data/education.model';
import { IEducation } from '../domain/education.schema';

const DEFAULT_EDUCATIONS: IEducation[] = [
  {
    degree: 'BBA (Major in Marketing)',
    institution: 'North South University',
    institutionUrl: 'http://www.northsouth.edu',
    fieldOfStudy: 'Marketing & Business Strategy',
    startDate: '2016',
    endDate: '2019',
    gradeOrGpa: '',
    achievements: ['Specialized in Strategic Marketing and Consumer Behavior'],
    orderIndex: 0
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Rajuk Uttara Model College',
    institutionUrl: 'https://rajukcollege.edu.bd',
    fieldOfStudy: 'Science / Business',
    startDate: '2014',
    endDate: '2015',
    gradeOrGpa: 'GPA 5.00',
    achievements: ['Perfect GPA 5.00', 'Active Debater & Cultural Participant'],
    orderIndex: 1
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Rajuk Uttara Model College',
    institutionUrl: 'https://rajukcollege.edu.bd',
    fieldOfStudy: 'General',
    startDate: '2012',
    endDate: '2013',
    gradeOrGpa: 'GPA 5.00',
    achievements: ['Perfect GPA 5.00'],
    orderIndex: 2
  }
];

export async function getEducations(): Promise<IEducation[]> {
  try {
    await connectToDatabase();
    const items = await EducationModel.find().sort({ orderIndex: 1 }).lean();
    if (!items || items.length === 0) return DEFAULT_EDUCATIONS;
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.warn('⚠️ DB Offline/Fallback used for Educations:', error);
    return DEFAULT_EDUCATIONS;
  }
}
