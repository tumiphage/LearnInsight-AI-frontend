'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Brain,
  Sparkles,
  HeartHandshake,
  FileText,
  Bell,
  Home,
  GraduationCap,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Landing', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/students', label: 'Students', icon: Users },
  { href: '/prediction', label: 'Prediction', icon: Brain },
  { href: '/explainable', label: 'Explainable AI', icon: Sparkles },
  { href: '/intervention', label: 'Intervention', icon: HeartHandshake },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/notifications', label: 'Alerts', icon: Bell },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card h-screen sticky top-0">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-base font-bold leading-tight text-foreground">LearnInsight AI</h1>
          <p className="text-xs text-muted-foreground">Student Analytics</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <div className="rounded-lg bg-secondary/60 p-3">
          <p className="text-xs font-semibold text-foreground">Dr. Sarah Chen</p>
          <p className="text-xs text-muted-foreground">Senior Lecturer</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">System Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  const mobileItems = [
    { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/students', label: 'Students', icon: Users },
    { href: '/prediction', label: 'Predict', icon: Brain },
    { href: '/intervention', label: 'Support', icon: HeartHandshake },
    { href: '/notifications', label: 'Alerts', icon: Bell },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all min-w-[60px]',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5 transition-transform', active && 'scale-110')} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-40 glass border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-sm font-bold text-foreground">LearnInsight AI</span>
        </Link>
        <Link
          href="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Link>
      </div>
    </header>
  );
}
