'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    fn()
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#ozellikler', label: 'Özellikler' },
    { href: '#nasil-calisir', label: 'Nasıl Çalışır?' },
    { href: '#etkinlik-turleri', label: 'Etkinlik Türleri' },
    { href: '#iletisim', label: 'İletişim' },
  ]

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={e => {
              if (window.location.pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            <Image
              src="/logo.png"
              alt="Hatıra Topla"
              width={56}
              height={56}
              className="rounded-xl group-hover:scale-105 transition-transform object-contain"
              unoptimized
            />
            <span className={cn(
              'text-xl font-bold transition-colors',
              scrolled ? 'text-slate-900' : 'text-white'
            )}>
              Hatıra <span className="gradient-text">Topla</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  scrolled
                    ? 'text-slate-600 hover:text-brand-600'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/musteri-girisi">
              <button className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                scrolled
                  ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  : 'border-white/30 text-white hover:bg-white/10'
              )}>
                Müşteri Girişi
              </button>
            </Link>
            <a href="#iletisim">
              <Button size="sm">Teklif Al</Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              scrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            )}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className={cn(
            'md:hidden pb-6 pt-2 border-t',
            scrolled ? 'border-slate-100 bg-white' : 'border-white/10 bg-slate-900/95 backdrop-blur-md'
          )}>
            <div className="flex flex-col gap-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                    scrolled
                      ? 'text-slate-700 hover:bg-slate-50'
                      : 'text-white/80 hover:bg-white/10'
                  )}
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-2">
                <Link href="/musteri-girisi" onClick={() => setOpen(false)}>
                  <button className={cn(
                    'w-full px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all',
                    scrolled
                      ? 'border-slate-200 text-slate-700'
                      : 'border-white/30 text-white'
                  )}>
                    Müşteri Girişi
                  </button>
                </Link>
                <a href="#iletisim" onClick={() => setOpen(false)}>
                  <Button className="w-full">Teklif Al</Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
