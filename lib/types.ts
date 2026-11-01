export type RiskLevel = 'Low' | 'Medium' | 'High';

export type UserRole = 'Lecturer' | 'Academic Advisor';

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  course: string;
  engagementScore: number;
  riskLevel: RiskLevel;
  lmsClicks: number;
  activeDays: number;
  assignmentCompletion: number;
  forumParticipation: number;
  resourceAccess: number;
  assessmentAverage: number;
  attendanceRate: number;
  lmsActivity: number;
  lastActive: string;
  interventionStatus: 'None' | 'In Progress' | 'Completed';
  weeklyEngagement: { week: string; score: number }[];
}

export interface Intervention {
  id: string;
  title: string;
  description: string;
  riskLevel: RiskLevel;
  priority: 'High' | 'Medium' | 'Low';
  icon: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'info';
  timestamp: string;
  studentName?: string;
  read: boolean;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  description: string;
  positiveImpact: boolean;
}
