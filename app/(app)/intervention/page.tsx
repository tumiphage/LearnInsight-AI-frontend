'use client';

import { useState } from 'react';
import { PageHeader, RiskBadge } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { interventions, students } from '@/lib/mock-data';
import { RiskLevel } from '@/lib/types';
import {
  HeartHandshake,
  Calendar,
  Users,
  Activity,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  calendar: Calendar,
  users: Users,
  activity: Activity,
  bell: Bell,
  'book-open': BookOpen,
  'check-circle': CheckCircle2,
};

export default function InterventionPage() {
  const [activeTab, setActiveTab] = useState<RiskLevel | 'all'>('all');

  const highRiskStudents = students.filter(s => s.riskLevel === 'High').slice(0, 5);
  const mediumRiskStudents = students.filter(s => s.riskLevel === 'Medium').slice(0, 5);

  const filteredInterventions = activeTab === 'all'
    ? interventions
    : interventions.filter(i => i.riskLevel === activeTab);

  const stats = {
    inProgress: students.filter(s => s.interventionStatus === 'In Progress').length,
    completed: students.filter(s => s.interventionStatus === 'Completed').length,
    none: students.filter(s => s.interventionStatus === 'None').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader
        title="Academic Interventions"
        subtitle="Risk-based recommendations to support at-risk students"
      />

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <Card className="border-border shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{stats.inProgress}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{stats.completed}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-secondary">
                <HeartHandshake className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{interventions.length}</p>
                <p className="text-xs text-muted-foreground">Protocols</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as RiskLevel | 'all')} className="mb-6">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="High">High</TabsTrigger>
          <TabsTrigger value="Medium">Medium</TabsTrigger>
          <TabsTrigger value="Low">Low</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInterventions.map((intervention) => {
              const Icon = iconMap[intervention.icon] || HeartHandshake;
              return (
                <Card
                  key={intervention.id}
                  className={`border-2 shadow-sm hover:shadow-md transition-all duration-300 ${
                    intervention.riskLevel === 'High' ? 'border-destructive/20' :
                    intervention.riskLevel === 'Medium' ? 'border-warning/20' :
                    'border-success/20'
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        intervention.riskLevel === 'High' ? 'bg-destructive/10 text-destructive' :
                        intervention.riskLevel === 'Medium' ? 'bg-warning/10 text-warning' :
                        'bg-success/10 text-success'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <RiskBadge level={intervention.riskLevel} />
                        <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                          intervention.priority === 'High' ? 'bg-destructive/10 text-destructive' :
                          intervention.priority === 'Medium' ? 'bg-warning/10 text-warning' :
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {intervention.priority} Priority
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">{intervention.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{intervention.description}</p>
                    <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs">
                      Assign Intervention <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Students Needing Intervention</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                High Risk — Immediate Action
              </h3>
              <div className="space-y-2">
                {highRiskStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.studentId} · {student.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                        student.interventionStatus === 'In Progress' ? 'bg-warning/10 text-warning' :
                        student.interventionStatus === 'Completed' ? 'bg-success/10 text-success' :
                        'bg-secondary text-muted-foreground'
                      }`}>
                        {student.interventionStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-warning mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-warning" />
                Medium Risk — Monitor & Engage
              </h3>
              <div className="space-y-2">
                {mediumRiskStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning text-xs font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.studentId} · {student.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                        student.interventionStatus === 'In Progress' ? 'bg-warning/10 text-warning' :
                        student.interventionStatus === 'Completed' ? 'bg-success/10 text-success' :
                        'bg-secondary text-muted-foreground'
                      }`}>
                        {student.interventionStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
