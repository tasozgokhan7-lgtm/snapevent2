import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 text-sm resize-none',
            'transition-all duration-200 outline-none',
            'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100',
            error && 'border-rose-400 focus:border-rose-400 focus:ring-rose-100',
            className
          )}
          rows={4}
          {...props}
        />
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
export default Textarea
