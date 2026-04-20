'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Camera, LayoutDashboard, LogOut, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { Customer } from '@/lib/types'

const navItems = [
  { href: '/musteri', label: 'Etkinliklerim', icon: LayoutDashboard, exact: true },
]

export default function CustomerSidebar({ customer }: { customer: Customer }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/musteri-girisi')
  }

  const NavContent = () => (
    <>
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center shadow-md shrink-0">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm">SnapEvent</div>
          <div className="text-xs text-slate-400">Müşteri Paneli</div>
        </div>
      </div>

      {/* User info */}
      <div className="mx-3 mt-4 p-3 rounded-xl bg-gradient-to-br from-brand-50 to-rose-50 border border-brand-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-rose-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {customer.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-800 truncate">{customer.full_name}</div>
            <div className="text-xs text-slate-400 truncate">{customer.email}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-gradient-to-r from-brand-500 to-rose-500 text-white shadow-lg shadow-brand-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-100">
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors w-full">
          <LogOut className="w-4 h-4" />
          Çıkış Yap
        </button>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-slate-100 h-screen sticky top-0">
        <NavContent />
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-sm">SnapEvent</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-slate-100">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-20">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white flex flex-col shadow-2xl">
            <NavContent />
          </aside>
        </div>
      )}
    </>
  )
}
