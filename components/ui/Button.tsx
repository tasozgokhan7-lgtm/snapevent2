'use client'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none'

    const variants = {
      primary: 'bg-gradient-to-r from-brand-600 to-rose-500 text-white hover:from-brand-700 hover:to-rose-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-brand-500',
      secondary: 'bg-white text-slate-800 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 shadow-sm hover:shadow-md focus:ring-brand-400',
      outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50 focus:ring-brand-400',
      ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400',
      danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm hover:shadow-md focus:ring-rose-400',
    }

    const sizes = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-sm px-4 py-2.5',
      lg: 'text-base px-6 py-3',
      xl: 'text-lg px-8 py-4',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Yükleniyor...
          </>
        ) : children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
