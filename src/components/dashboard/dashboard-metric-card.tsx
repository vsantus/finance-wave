import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type DashboardMetricCardProps = {
  label: string
  value: string
  className?: string
  valueClassName?: string
}

export function DashboardMetricCard({
  label,
  value,
  className,
  valueClassName = 'text-foreground',
}: DashboardMetricCardProps) {
  return (
    <Card className={cn('metric-tile', className)}>
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <CardTitle className={`text-3xl ${valueClassName}`}>{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}
