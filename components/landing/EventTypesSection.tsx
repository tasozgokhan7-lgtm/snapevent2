const types = [
  { emoji: '💍', title: 'Düğün', desc: 'En özel günün tüm anlarını misafirlerinizle paylaşın.' },
  { emoji: '💑', title: 'Nişan', desc: 'Mutluluğun ilk adımını ölümsüzleştirin.' },
  { emoji: '🎂', title: 'Doğum Günü', desc: 'Sürpriz ve neşeyle dolu anlar kaybolmasın.' },
  { emoji: '🎓', title: 'Mezuniyet', desc: 'Emeklerin meyvesi bu kutlamayı belgelein.' },
  { emoji: '🏢', title: 'Kurumsal Etkinlik', desc: 'Şirket organizasyonlarını profesyonelce arşivleyin.' },
  { emoji: '🎉', title: 'Özel Kutlama', desc: 'Her türlü özel anı ortak galeriye taşıyın.' },
]

export default function EventTypesSection() {
  return (
    <section id="etkinlik-turleri" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium mb-4">
            Etkinlik Türleri
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Her Etkinlik İçin <span className="gradient-text">Mükemmel Çözüm</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Düğünden kurumsal etkinliğe, doğum gününden mezuniyete — AnıTopla her kutlamanıza yakışır.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map(({ emoji, title, desc }) => (
            <div key={title} className="group relative p-8 rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 hover:from-brand-50 hover:to-rose-50 hover:border-brand-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">{emoji}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
