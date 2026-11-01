'use client';

import Link from 'next/link';
import {
  GraduationCap,
  Brain,
  ShieldCheck,
  HeartHandshake,
  BarChart3,
  Sparkles,
  ArrowRight,
  Smartphone,
  Users,
  TrendingUp,
  AlertTriangle,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-white">
      <nav className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-foreground">LearnInsight AI</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <Link href="/dashboard" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link href="/students" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Students</Link>
            <Link href="/prediction" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Prediction</Link>
            <Link href="/explainable" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Explainable AI</Link>
          </div>
          <Link href="/dashboard">
            <Button size="sm" className="gap-1.5">
              Launch App <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-500/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Academic Research Project
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
                Studying Future LMS Engagement with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AI-Powered Insights
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                LearnInsight AI analyzes Learning Management System interaction data to predict
                future LMS engagement, explain contributing features, and support human-reviewed
                student outreach. Dashboard and student records are illustrative until real data are connected.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Explore Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/prediction">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Try Prediction Tool
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  100 Illustrative Student Records
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Explainable AI Model
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Mobile-First Design
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-blue-500/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement Overview</p>
                    <p className="text-2xl font-bold text-foreground">73.2% Average</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                    <TrendingUp className="h-3.5 w-3.5" /> +4.2%
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl bg-secondary/60 p-3 text-center">
                    <Users className="h-5 w-5 text-primary mx-auto mb-1.5" />
                    <p className="text-xl font-bold text-foreground">100</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="rounded-xl bg-secondary/60 p-3 text-center">
                    <AlertTriangle className="h-5 w-5 text-destructive mx-auto mb-1.5" />
                    <p className="text-xl font-bold text-foreground">14</p>
                    <p className="text-xs text-muted-foreground">At-Risk</p>
                  </div>
                  <div className="rounded-xl bg-secondary/60 p-3 text-center">
                    <ShieldCheck className="h-5 w-5 text-success mx-auto mb-1.5" />
                    <p className="text-xl font-bold text-foreground">73%</p>
                    <p className="text-xs text-muted-foreground">Success</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Low Risk</span>
                      <span className="font-semibold text-success">61 students</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-success" style={{ width: '61%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Medium Risk</span>
                      <span className="font-semibold text-warning">25 students</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-warning" style={{ width: '25%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">High Risk</span>
                      <span className="font-semibold text-destructive">14 students</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-destructive" style={{ width: '14%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-xl glass shadow-xl p-4 animate-slide-up">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">AI Prediction</p>
                  <p className="text-xs text-muted-foreground">87% Confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Project Overview</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Developing an Intelligent Mobile App for Student Learning Behavior Analysis
            Using LMS Interaction Data
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: BarChart3, title: 'Engagement Monitoring', desc: 'Track LMS interactions, activity patterns, and engagement scores across all enrolled students in real time.', color: 'text-primary bg-primary/10' },
            { icon: Brain, title: 'At-Risk Prediction', desc: 'Machine learning model analyzes behavioral patterns to predict which students are likely to struggle academically.', color: 'text-accent bg-accent/10' },
            { icon: Sparkles, title: 'Explainable AI', desc: 'SHAP-inspired visualizations show exactly which factors drive each prediction, building trust and understanding.', color: 'text-warning bg-warning/10' },
            { icon: HeartHandshake, title: 'Intervention Support', desc: 'Risk-level-based recommendations help lecturers and advisors take timely, targeted academic action.', color: 'text-success bg-success/10' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Key Benefits</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering educators with data-driven insights to improve student outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: 'Early Risk Detection', desc: 'Identify at-risk students weeks before traditional indicators like missed deadlines or failing grades appear.', stat: '3 weeks earlier' },
              { icon: Sparkles, title: 'Transparent AI', desc: 'Every prediction comes with a clear breakdown of contributing factors, so educators understand the why behind the what.', stat: '6 explainable features' },
              { icon: HeartHandshake, title: 'Targeted Interventions', desc: 'Risk-level-specific recommendations ensure the right support reaches the right student at the right time.', stat: '73% success rate' },
              { icon: Smartphone, title: 'Mobile-First Design', desc: 'Access insights anywhere with an interface designed for the future mobile application experience.', stat: 'Fully responsive' },
              { icon: Users, title: 'Student-Centric', desc: 'Individual student profiles combine engagement, assessment, and behavioral data for a holistic view.', stat: '100 student profiles' },
              { icon: FileText, title: 'Academic Reports', desc: 'Generate professional PDF-style reports for supervisor reviews, committee meetings, and student consultations.', stat: 'Auto-generated' },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="flex gap-4 rounded-xl bg-card border border-border p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{benefit.desc}</p>
                    <span className="text-xs font-semibold text-primary">{benefit.stat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From raw LMS data to actionable intervention in four steps
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {[
            { step: '01', title: 'Data Collection', desc: 'LMS interaction data is collected including clicks, logins, resource access, forum posts, and assignment submissions.' },
            { step: '02', title: 'Pattern Analysis', desc: 'The AI model analyzes behavioral patterns to compute engagement scores and identify risk indicators.' },
            { step: '03', title: 'Risk Prediction', desc: 'Students are classified as Low, Medium, or High risk with confidence scores and feature contributions.' },
            { step: '04', title: 'Intervention', desc: 'Educators receive tailored intervention recommendations and can track outcomes through follow-up reports.' },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="text-3xl font-bold text-primary/20">{item.step}</span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-10 text-border">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 sm:p-12 lg:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/50 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Explore the Prototype?
            </h2>
            <p className="mt-4 text-lg text-blue-50 max-w-2xl mx-auto">
              Navigate the full demonstration — from dashboard analytics to AI-powered
              predictions and intervention planning.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                  Launch Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/students">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                  View Student Analytics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">LearnInsight AI</p>
                <p className="text-xs text-muted-foreground">Academic Research Project</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              Developing an Intelligent Mobile App for Student Learning Behavior Analysis
              <br className="hidden sm:block" /> Using LMS Interaction Data · Final Year Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
