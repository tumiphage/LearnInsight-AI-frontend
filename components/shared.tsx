import { cn } from '@/lib/utils';
import { RiskLevel } from '@/lib/types';

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const styles: Record<RiskLevel, string> = {
    Low: 'bg-success/10 text-success border-success/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    High: 'bg-destructive/10 text-destructive border-destructive/20',
  };
  const dotStyles: Record<RiskLevel, string> = {
    Low: 'bg-success',
    Medium: 'bg-warning',
    High: 'bg-destructive',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        styles[level],
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[level])} />
      {level} Risk
    </span>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
