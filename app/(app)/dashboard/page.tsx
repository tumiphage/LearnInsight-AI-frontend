'use client';

import { PageHeader } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStats, engagementTrendData, riskDistributionData, courseEngagementData, lmsActivityData } from '@/lib/mock-data';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Activity,
  BookOpen,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const kpiCards = [
  {
    title: 'Total Students',
    value: dashboardStats.totalStudents,
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    change: '+5 this semester',
    changeType: 'positive' as const,
  },
  {
    title: 'Avg Engagement Score',
    value: `${dashboardStats.averageEngagement}%`,
    icon: TrendingUp,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    change: '+4.2% from last week',
    changeType: 'positive' as const,
  },
  {
    title: 'At-Risk Students',
    value: dashboardStats.atRiskStudents,
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    change: '-2 from last week',
    changeType: 'positive' as const,
  },
  {
    title: 'Intervention Success',
    value: `${dashboardStats.interventionSuccessRate}%`,
    icon: ShieldCheck,
    color: 'text-success',
    bgColor: 'bg-success/10',
    change: '+8% improvement',
    changeType: 'positive' as const,
  },
];

const trendConfig: ChartConfig = {
  engagement: { label: 'Engagement Score', color: 'hsl(var(--primary))' },
  atRisk: { label: 'At-Risk Count', color: 'hsl(var(--destructive))' },
};

const riskConfig: ChartConfig = {
  low: { label: 'Low Risk', color: 'hsl(var(--success))' },
  medium: { label: 'Medium Risk', color: 'hsl(var(--warning))' },
  high: { label: 'High Risk', color: 'hsl(var(--destructive))' },
};

const lmsConfig: ChartConfig = {
  clicks: { label: 'LMS Clicks', color: 'hsl(var(--primary))' },
  sessions: { label: 'Sessions', color: 'hsl(var(--accent))' },
};

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Real-time overview of student engagement and risk metrics"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Card
              key={i}
              className="relative overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${card.bgColor}`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.color}`} />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{card.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{card.title}</p>
                  <p className={`text-xs mt-1.5 ${card.changeType === 'positive' ? 'text-success' : 'text-destructive'}`}>
                    {card.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Engagement & Risk Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendConfig} className="h-[280px] sm:h-[320px] w-full">
              <AreaChart data={engagementTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="engagementGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="engagement" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#engagementGrad)" />
                <Area type="monotone" dataKey="atRisk" stroke="hsl(var(--destructive))" strokeWidth={2} fill="url(#riskGrad)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <CardTitle className="text-base">Risk Distribution</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={riskConfig} className="h-[280px] sm:h-[320px] w-full">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent nameKey="value" />} />
              </PieChart>
            </ChartContainer>
            <div className="space-y-2 mt-2">
              {riskDistributionData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              <CardTitle className="text-base">Course Engagement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ engagement: { label: 'Engagement', color: 'hsl(var(--primary))' } }} className="h-[260px] w-full">
              <BarChart data={courseEngagementData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis type="category" dataKey="course" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={120} className="fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Weekly LMS Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lmsConfig} className="h-[260px] w-full">
              <BarChart data={lmsActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="clicks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
