import { Student, RiskLevel, NotificationItem, Intervention, FeatureImportance } from './types';

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa',
  'Anthony', 'Betty', 'Mark', 'Margaret', 'Donald', 'Sandra', 'Steven', 'Ashley',
  'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle',
  'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah',
  'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura',
  'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Shirley',
  'Eric', 'Angela', 'Jonathan', 'Helen', 'Stephen', 'Anna', 'Larry', 'Brenda',
  'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Emma', 'Benjamin', 'Samantha',
  'Samuel', 'Katherine', 'Gregory', 'Christine', 'Frank', 'Debra', 'Alexander', 'Rachel',
  'Raymond', 'Catherine', 'Patrick', 'Carolyn', 'Jack', 'Janet', 'Dennis', 'Ruth',
  'Jerry', 'Maria', 'Tyler', 'Heather', 'Aaron'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker',
  'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy',
  'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
  'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza',
  'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers',
  'Long', 'Ross', 'Foster', 'Jimenez'
];

const courses = [
  'Computer Science 201', 'Data Structures 301', 'Machine Learning 401',
  'Database Systems 302', 'Software Engineering 303', 'Artificial Intelligence 402',
  'Web Development 202', 'Algorithms 304', 'Cybersecurity 305', 'Data Analytics 306'
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateStudents(): Student[] {
  const rand = seededRandom(42);
  const students: Student[] = [];

  for (let i = 0; i < 100; i++) {
    const fn = firstNames[Math.floor(rand() * firstNames.length)];
    const ln = lastNames[Math.floor(rand() * lastNames.length)];
    const name = `${fn} ${ln}`;
    const studentId = `STU${String(2024000 + i + 1).padStart(7, '0')}`;
    const course = courses[Math.floor(rand() * courses.length)];

    const lmsClicks = Math.floor(rand() * 4500) + 200;
    const activeDays = Math.floor(rand() * 90) + 10;
    const assignmentCompletion = Math.floor(rand() * 50) + 50;
    const forumParticipation = Math.floor(rand() * 100);
    const resourceAccess = Math.floor(rand() * 200) + 20;
    const assessmentAverage = Math.floor(rand() * 55) + 40;
    const attendanceRate = Math.floor(rand() * 40) + 60;

    const engagementScore = Math.round(
      (lmsClicks / 45) * 0.15 +
      (activeDays / 90) * 0.2 +
      (assignmentCompletion / 100) * 0.25 +
      (forumParticipation / 100) * 0.1 +
      (resourceAccess / 200) * 0.1 +
      (assessmentAverage / 100) * 0.15 +
      (attendanceRate / 100) * 0.05
    );

    let riskLevel: RiskLevel;
    if (engagementScore >= 65) riskLevel = 'Low';
    else if (engagementScore >= 40) riskLevel = 'Medium';
    else riskLevel = 'High';

    const lmsActivity = Math.round((lmsClicks / 4500) * 100);

    const weeklyEngagement = Array.from({ length: 12 }, (_, week) => {
      const variance = (rand() - 0.5) * 20;
      const trend = (week / 12) * (engagementScore > 50 ? 5 : -8);
      return {
        week: `W${week + 1}`,
        score: Math.max(0, Math.min(100, Math.round(engagementScore + variance + trend)))
      };
    });

    const interventionStatuses: ('None' | 'In Progress' | 'Completed')[] = ['None', 'In Progress', 'Completed'];
    const interventionStatus = riskLevel === 'Low' ? 'None' : 
      riskLevel === 'High' ? (rand() > 0.4 ? 'In Progress' : 'Completed') :
      (rand() > 0.6 ? 'In Progress' : 'None');

    const daysAgo = Math.floor(rand() * 7);
    const lastActive = `${daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`}`;

    students.push({
      id: `student-${i + 1}`,
      studentId,
      name,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@university.edu`,
      course,
      engagementScore,
      riskLevel,
      lmsClicks,
      activeDays,
      assignmentCompletion,
      forumParticipation,
      resourceAccess,
      assessmentAverage,
      attendanceRate,
      lmsActivity,
      lastActive,
      interventionStatus,
      weeklyEngagement,
    });
  }

  return students;
}

export const students = generateStudents();

export const dashboardStats = {
  totalStudents: students.length,
  averageEngagement: Math.round(students.reduce((sum, s) => sum + s.engagementScore, 0) / students.length),
  atRiskStudents: students.filter(s => s.riskLevel === 'High').length,
  mediumRiskStudents: students.filter(s => s.riskLevel === 'Medium').length,
  lowRiskStudents: students.filter(s => s.riskLevel === 'Low').length,
  interventionSuccessRate: 73,
};

export const engagementTrendData = [
  { week: 'W1', engagement: 62, atRisk: 18 },
  { week: 'W2', engagement: 64, atRisk: 17 },
  { week: 'W3', engagement: 61, atRisk: 19 },
  { week: 'W4', engagement: 66, atRisk: 16 },
  { week: 'W5', engagement: 68, atRisk: 15 },
  { week: 'W6', engagement: 65, atRisk: 17 },
  { week: 'W7', engagement: 70, atRisk: 14 },
  { week: 'W8', engagement: 72, atRisk: 12 },
  { week: 'W9', engagement: 69, atRisk: 13 },
  { week: 'W10', engagement: 74, atRisk: 11 },
  { week: 'W11', engagement: 71, atRisk: 12 },
  { week: 'W12', engagement: 73, atRisk: 10 },
];

export const riskDistributionData = [
  { name: 'Low Risk', value: students.filter(s => s.riskLevel === 'Low').length, color: 'hsl(var(--success))' },
  { name: 'Medium Risk', value: students.filter(s => s.riskLevel === 'Medium').length, color: 'hsl(var(--warning))' },
  { name: 'High Risk', value: students.filter(s => s.riskLevel === 'High').length, color: 'hsl(var(--destructive))' },
];

export const courseEngagementData = courses.map(course => {
  const courseStudents = students.filter(s => s.course === course);
  const avg = courseStudents.length > 0
    ? Math.round(courseStudents.reduce((sum, s) => sum + s.engagementScore, 0) / courseStudents.length)
    : 0;
  const atRisk = courseStudents.filter(s => s.riskLevel === 'High').length;
  return {
    course: course.replace(/\d+/g, '').trim(),
    engagement: avg,
    atRisk,
  };
});

export const lmsActivityData = [
  { day: 'Mon', clicks: 3200, sessions: 180 },
  { day: 'Tue', clicks: 4100, sessions: 220 },
  { day: 'Wed', clicks: 3800, sessions: 195 },
  { day: 'Thu', clicks: 4500, sessions: 240 },
  { day: 'Fri', clicks: 3900, sessions: 210 },
  { day: 'Sat', clicks: 1800, sessions: 95 },
  { day: 'Sun', clicks: 1200, sessions: 70 },
];

export const featureImportanceData: FeatureImportance[] = [
  { feature: 'Assignment Completion Rate', importance: 32, description: 'Percentage of submitted assignments', positiveImpact: false },
  { feature: 'LMS Activity (Clicks)', importance: 25, description: 'Total interactions with the LMS platform', positiveImpact: false },
  { feature: 'Forum Participation', importance: 15, description: 'Discussion board engagement', positiveImpact: false },
  { feature: 'Assessment Average', importance: 12, description: 'Average score across assessments', positiveImpact: false },
  { feature: 'Active Learning Days', importance: 10, description: 'Number of days with LMS activity', positiveImpact: false },
  { feature: 'Resource Access Frequency', importance: 6, description: 'How often learning materials are accessed', positiveImpact: false },
];

export const interventions: Intervention[] = [
  {
    id: 'int-1',
    title: 'Schedule Academic Consultation',
    description: 'Arrange a one-on-one meeting with the student to discuss academic challenges, review their progress, and create a personalized improvement plan.',
    riskLevel: 'High',
    priority: 'High',
    icon: 'calendar',
  },
  {
    id: 'int-2',
    title: 'Personalized Learning Support',
    description: 'Assign a peer mentor or academic tutor to provide targeted support in areas where the student is struggling most.',
    riskLevel: 'High',
    priority: 'High',
    icon: 'users',
  },
  {
    id: 'int-3',
    title: 'Progress Monitoring',
    description: 'Set up weekly check-ins and progress tracking to ensure the student stays on track with their academic goals.',
    riskLevel: 'High',
    priority: 'Medium',
    icon: 'activity',
  },
  {
    id: 'int-4',
    title: 'Engagement Reminder',
    description: 'Send automated reminders to encourage the student to log in, complete assignments, and participate in discussions.',
    riskLevel: 'Medium',
    priority: 'Medium',
    icon: 'bell',
  },
  {
    id: 'int-5',
    title: 'Study Skills Workshop',
    description: 'Recommend enrollment in a study skills or time management workshop to help the student develop better learning habits.',
    riskLevel: 'Medium',
    priority: 'Low',
    icon: 'book-open',
  },
  {
    id: 'int-6',
    title: 'Continue Current Learning Strategy',
    description: 'The student is performing well. Encourage them to maintain their current engagement levels and explore advanced materials.',
    riskLevel: 'Low',
    priority: 'Low',
    icon: 'check-circle',
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'New High-Risk Student Identified',
    message: 'Student STU2024018 has been flagged as high-risk due to a significant drop in LMS engagement and missed assignments.',
    type: 'critical',
    timestamp: '12 minutes ago',
    studentName: 'STU2024018',
    read: false,
  },
  {
    id: 'n2',
    title: 'Low Assignment Activity Detected',
    message: '5 students in Machine Learning 401 have not submitted their latest assignment. Consider sending reminders.',
    type: 'warning',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 'n3',
    title: 'Engagement Drop Warning',
    message: 'Overall course engagement in Data Structures 301 has decreased by 15% compared to last week.',
    type: 'warning',
    timestamp: '3 hours ago',
    read: false,
  },
  {
    id: 'n4',
    title: 'Intervention Completed Successfully',
    message: 'Student STU2024007 has shown improvement after the academic consultation. Risk level updated from High to Medium.',
    type: 'info',
    timestamp: '5 hours ago',
    studentName: 'STU2024007',
    read: true,
  },
  {
    id: 'n5',
    title: 'Weekly Report Available',
    message: 'The weekly engagement analytics report for all courses is now available for download.',
    type: 'info',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 'n6',
    title: 'Forum Participation Alert',
    message: '12 students have zero forum participation this week. Consider initiating discussion topics to boost engagement.',
    type: 'warning',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 'n7',
    title: 'Positive Trend Detected',
    message: 'Software Engineering 303 shows a 22% increase in active learning days compared to the previous week.',
    type: 'info',
    timestamp: '2 days ago',
    read: true,
  },
];

