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
    const fn = () => setScrolled(window.scrollY > 20)
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
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.png" alt="Hatıra Topla" width={40} height={40} className="rounded-xl group-hover:scale-105 transition-transform" />
            <span className="text-xl font-bold text-slate-900">
              Anı<span className="gradient-text">Topla</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/musteri-girisi">
              <Button variant="secondary" size="sm">Müşteri Girişi</Button>
            </Link>
            <a href="#iletisim">
              <Button size="sm">Teklif Al</Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-6 pt-2 border-t border-slate-100">
            <div className="flex flex-col gap-1">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl">
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-2">
                <Link href="/musteri-girisi" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full">Müşteri Girişi</Button>
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
