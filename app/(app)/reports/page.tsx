'use client';

import { useState } from 'react';
import { PageHeader, RiskBadge } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { students, dashboardStats } from '@/lib/mock-data';
import { FileText, Download, Printer, User, GraduationCap } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ReportsPage() {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const reportSections = [
    { label: 'Student Profile', icon: User },
    { label: 'Risk Assessment', icon: FileText },
    { label: 'Recommendations', icon: GraduationCap },
    { label: 'Analytics Summary', icon: FileText },
  ];

  const recommendations =
    selectedStudent.riskLevel === 'High'
      ? ['Schedule an academic consultation within 5 business days', 'Assign a peer mentor for personalized learning support', 'Implement weekly progress monitoring check-ins', 'Review assessment preparation strategies']
      : selectedStudent.riskLevel === 'Medium'
      ? ['Send automated engagement reminders', 'Recommend enrollment in the study skills workshop', 'Encourage forum participation through guided discussions', 'Monitor weekly engagement trends']
      : ['Continue current learning strategy', 'Consider advanced learning materials', 'Maintain consistent engagement levels', 'Share best practices with peers'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader
        title="Academic Reports"
        subtitle="Generate professional PDF-style reports for student assessment reviews"
      />

      <Card className="border-border shadow-sm mb-6">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {students.slice(0, 30).map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} ({s.studentId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button size="sm" className="gap-1.5">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-[200px_1fr] gap-6">
        <div className="hidden lg:block">
          <h3 className="text-sm font-semibold text-foreground mb-3">Report Sections</h3>
          <div className="space-y-1">
            {reportSections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-secondary/40 p-4">
            <p className="text-xs font-semibold text-foreground mb-2">Report Info</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>Generated: Oct 11, 2026</p>
              <p>Model: LearnInsight AI v2.1</p>
              <p>Confidence: 87%</p>
            </div>
          </div>
        </div>

        <Card className="border-border shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold">LearnInsight AI</span>
                </div>
                <h2 className="text-xl font-bold">Student Academic Report</h2>
                <p className="text-sm text-blue-50 mt-1">Confidential — For Academic Use Only</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-50">Report ID</p>
                <p className="text-sm font-semibold">RPT-{selectedStudent.studentId}</p>
                <p className="text-xs text-blue-50 mt-2">Date</p>
                <p className="text-sm font-semibold">Oct 11, 2026</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Student Profile</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl border border-border p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm font-semibold text-foreground">{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Student ID</p>
                  <p className="text-sm font-semibold text-foreground">{selectedStudent.studentId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Course</p>
                  <p className="text-sm font-semibold text-foreground">{selectedStudent.course}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold text-foreground truncate">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Active</p>
                  <p className="text-sm font-semibold text-foreground">{selectedStudent.lastActive}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk Level</p>
                  <div className="mt-0.5"><RiskBadge level={selectedStudent.riskLevel} /></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Risk Assessment</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="rounded-lg bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Engagement Score</p>
                  <p className="text-lg font-bold text-foreground">{selectedStudent.engagementScore}%</p>
                </div>
                <div className="rounded-lg bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Assessment Avg</p>
                  <p className="text-lg font-bold text-foreground">{selectedStudent.assessmentAverage}%</p>
                </div>
                <div className="rounded-lg bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className="text-lg font-bold text-foreground">{selectedStudent.attendanceRate}%</p>
                </div>
                <div className="rounded-lg bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">LMS Activity</p>
                  <p className="text-lg font-bold text-foreground">{selectedStudent.lmsActivity}%</p>
                </div>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold text-foreground mb-2">Weekly Engagement Trend</p>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={selectedStudent.weeklyEngagement}>
                    <defs>
                      <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#reportGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Recommendations</h3>
              </div>
              <div className="rounded-xl border border-border p-4">
                <ul className="space-y-2.5">
                  {recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Analytics Summary</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs font-semibold text-foreground mb-3">LMS Interaction Data</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Clicks</span>
                      <span className="font-semibold text-foreground">{selectedStudent.lmsClicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Days</span>
                      <span className="font-semibold text-foreground">{selectedStudent.activeDays}/90</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Forum Participation</span>
                      <span className="font-semibold text-foreground">{selectedStudent.forumParticipation}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resource Access</span>
                      <span className="font-semibold text-foreground">{selectedStudent.resourceAccess}/200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assignment Completion</span>
                      <span className="font-semibold text-foreground">{selectedStudent.assignmentCompletion}%</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs font-semibold text-foreground mb-3">Course Context</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Course Avg Engagement</span>
                      <span className="font-semibold text-foreground">{dashboardStats.averageEngagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Student vs Avg</span>
                      <span className={`font-semibold ${selectedStudent.engagementScore >= dashboardStats.averageEngagement ? 'text-success' : 'text-destructive'}`}>
                        {selectedStudent.engagementScore >= dashboardStats.averageEngagement ? '+' : ''}
                        {selectedStudent.engagementScore - dashboardStats.averageEngagement}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Students</span>
                      <span className="font-semibold text-foreground">{dashboardStats.totalStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Course At-Risk</span>
                      <span className="font-semibold text-destructive">{dashboardStats.atRiskStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Intervention Status</span>
                      <span className="font-semibold text-foreground">{selectedStudent.interventionStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <p>Generated by LearnInsight AI · v2.1</p>
                <p>Page 1 of 1</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
