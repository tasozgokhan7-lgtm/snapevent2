import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color?: 'brand' | 'rose' | 'emerald' | 'amber' | 'blue'
  description?: string
}

export default function StatCard({ title, value, icon: Icon, color = 'brand', description }: StatCardProps) {
  const colors = {
    brand: 'from-brand-500 to-brand-600 shadow-brand-200',
    rose: 'from-rose-500 to-rose-600 shadow-rose-200',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-200',
    amber: 'from-amber-500 to-amber-600 shadow-amber-200',
    blue: 'from-blue-500 to-blue-600 shadow-blue-200',
  }
  const bgs = {
    brand: 'bg-brand-50',
    rose: 'bg-rose-50',
    emerald: 'bg-emerald-50',
    amber: 'bg-amber-50',
    blue: 'bg-blue-50',
  }

  return (
    <div className={cn('bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow', bgs[color])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
          {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
        </div>
        <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg', colors[color])}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}
