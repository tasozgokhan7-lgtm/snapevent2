'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const PHONE = '905454298439'
const MESSAGE = 'Merhaba, Hatıra Topla hakkında bilgi almak istiyorum.'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16.004 3C9.382 3 4 8.382 4 15.004c0 2.648.87 5.1 2.34 7.086L4.06 28.94l7.05-2.25a11.93 11.93 0 0 0 4.894 1.043C22.626 27.733 28 22.35 28 15.73 28 9.107 22.626 3 16.004 3zm0 21.93a9.9 9.9 0 0 1-5.045-1.378l-.362-.215-3.742 1.194 1.22-3.648-.236-.374a9.86 9.86 0 0 1-1.52-5.275c0-5.466 4.448-9.914 9.918-9.914 5.466 0 9.914 4.448 9.914 9.914 0 5.47-4.448 9.918-9.914 9.918l-.233-.222zm5.44-7.42c-.298-.15-1.765-.87-2.038-.97-.273-.1-.472-.148-.67.15-.2.297-.768.97-.942 1.17-.173.198-.347.223-.645.074-.297-.15-1.258-.464-2.396-1.478-.886-.79-1.483-1.765-1.657-2.062-.173-.298-.018-.46.13-.608.135-.133.298-.347.447-.52.15-.174.2-.298.298-.497.1-.198.05-.372-.025-.52-.074-.15-.67-1.612-.917-2.207-.242-.58-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.15.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const [showBubble, setShowBubble] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Konuşma balonunu 3 saniye sonra göster
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 3000)
    return () => clearTimeout(t)
  }, [])

  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
      {/* Chat bubble */}
      {showBubble && !dismissed && (
        <div className="animate-fade-up relative bg-white rounded-2xl rounded-br-sm shadow-2xl border border-slate-100 p-4 max-w-[230px] mb-1">
          <button
            onClick={() => setDismissed(true)}
            className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow"
            aria-label="Kapat"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm text-slate-700 font-medium leading-snug">
            👋 Merhaba! Her türlü sorunuz için bize WhatsApp&apos;tan yazabilirsiniz.
          </p>
          <p className="text-xs text-slate-400 mt-1">Genellikle birkaç dakika içinde yanıtlıyoruz.</p>
        </div>
      )}

      {/* Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişime geçin"
        className="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]" style={{ animation: 'ping-soft 2s ease-out infinite' }} />
        <WhatsAppIcon className="relative w-7 h-7" />
      </a>
    </div>
  )
}
