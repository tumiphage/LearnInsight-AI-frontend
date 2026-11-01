'use client';

import { useState, useMemo } from 'react';
import { PageHeader, RiskBadge } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { students } from '@/lib/mock-data';
import { Search, Users, TrendingUp, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { RiskLevel } from '@/lib/types';

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const courses = useMemo(() => Array.from(new Set(students.map(s => s.course))), []);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());
      const matchesRisk = riskFilter === 'all' || s.riskLevel === riskFilter;
      const matchesCourse = courseFilter === 'all' || s.course === courseFilter;
      return matchesSearch && matchesRisk && matchesCourse;
    });
  }, [search, riskFilter, courseFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const stats = {
    total: filtered.length,
    highRisk: filtered.filter(s => s.riskLevel === 'High').length,
    avgEngagement: filtered.length > 0 ? Math.round(filtered.reduce((sum, s) => sum + s.engagementScore, 0) / filtered.length) : 0,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader
        title="Student Analytics"
        subtitle={`${students.length} students across ${courses.length} courses`}
      />

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <Card className="border-border shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Filtered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-success/10">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{stats.avgEngagement}%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{stats.highRisk}</p>
                <p className="text-xs text-muted-foreground">High Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-sm mb-4">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9"
              />
            </div>
            <Select value={riskFilter} onValueChange={(v) => { setRiskFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={(v) => { setCourseFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-3 sm:px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">Student</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Course</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">Engagement</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">Risk</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">LMS Activity</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Assessment</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Attendance</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((student) => (
                  <tr key={student.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate max-w-[140px] sm:max-w-[180px]">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">{student.course}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-14 sm:w-16 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.engagementScore >= 65 ? 'bg-success' :
                              student.engagementScore >= 40 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${student.engagementScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground">{student.engagementScore}%</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <RiskBadge level={student.riskLevel} />
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs font-medium text-foreground">{student.lmsActivity}%</span>
                      <p className="text-xs text-muted-foreground">{student.lmsClicks.toLocaleString()} clicks</p>
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                      <span className={`text-xs font-medium ${student.assessmentAverage >= 70 ? 'text-success' : student.assessmentAverage >= 50 ? 'text-warning' : 'text-destructive'}`}>
                        {student.assessmentAverage}%
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                      <span className={`text-xs font-medium ${student.attendanceRate >= 80 ? 'text-success' : student.attendanceRate >= 60 ? 'text-warning' : 'text-destructive'}`}>
                        {student.attendanceRate}%
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">{student.lastActive}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No students found matching your filters.</p>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground disabled:opacity-40 hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-medium text-foreground">{page} / {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground disabled:opacity-40 hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
