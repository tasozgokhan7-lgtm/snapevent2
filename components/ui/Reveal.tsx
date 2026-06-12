'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'left' | 'right' | 'scale'

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
}: {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const dirClass =
    direction === 'left' ? 'reveal-left'
    : direction === 'right' ? 'reveal-right'
    : direction === 'scale' ? 'reveal-scale'
    : ''

  return (
    <div
      ref={ref}
      className={cn('reveal', dirClass, visible && 'reveal-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
