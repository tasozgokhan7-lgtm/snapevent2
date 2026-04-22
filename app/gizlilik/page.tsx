import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Gizlilik Politikası | AnıTopla',
  description: 'AnıTopla platformunun gizlilik politikası ve kişisel veri koruma ilkeleri.',
}

export default function GizlilikPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-sm font-semibold text-slate-900">AnıTopla</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title block */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium mb-4">
            Yasal Bildirim
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Gizlilik Politikası</h1>
          <p className="text-slate-500 text-sm">Son güncelleme: Nisan 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">

          <Section title="1. Genel Bakış">
            <p>
              AnıTopla olarak kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası,
              platformumuzu ziyaret ettiğinizde veya kullandığınızda hangi bilgileri topladığımızı, bu bilgileri
              nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.
            </p>
            <p>
              Platformumuzu kullanmaya devam ederek bu politikayı kabul etmiş sayılırsınız. Herhangi bir sorunuz için
              bize <a href="mailto:info@anıtopla.com" className="text-brand-600 hover:underline">info@anıtopla.com</a> adresinden ulaşabilirsiniz.
            </p>
          </Section>

          <Section title="2. Topladığımız Bilgiler">
            <p>AnıTopla üç farklı kullanıcı grubuna hizmet verir; her gruba göre toplanan veriler farklılık gösterir:</p>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Misafirler (Etkinlik Katılımcıları)</h4>
                <ul>
                  <li>Ad ve soyad (isteğe bağlı olarak girilir)</li>
                  <li>Yüklenen fotoğraf dosyaları ve meta verileri</li>
                  <li>Tarayıcınıza özgü anonim oturum tanımlayıcısı (localStorage)</li>
                  <li>Yükleme tarihi ve saati</li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Müşteriler (Etkinlik Sahipleri)</h4>
                <ul>
                  <li>Ad, soyad ve e-posta adresi</li>
                  <li>Şifrelenmiş hesap parolası</li>
                  <li>Oluşturulan etkinliklere ait bilgiler (ad, tarih, slug)</li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                <h4 className="font-semibold text-slate-800 mb-2">İletişim Formu Kullanıcıları</h4>
                <ul>
                  <li>Ad soyad, e-posta veya telefon numarası</li>
                  <li>Etkinlik türü ve tarihi</li>
                  <li>Mesaj içeriği</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="3. Bilgileri Nasıl Kullanıyoruz?">
            <p>Topladığımız bilgileri yalnızca şu amaçlarla kullanıyoruz:</p>
            <ul>
              <li>Etkinlik galerilerinin oluşturulması ve katılımcılarla paylaşılması</li>
              <li>Müşteri hesabının yönetimi ve platforma erişim sağlanması</li>
              <li>İletişim taleplerine yanıt verilmesi</li>
              <li>Platformun güvenliğinin ve istikrarının sağlanması</li>
              <li>Hizmet kalitesinin iyileştirilmesi (anonim istatistikler)</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
            <p>
              Verilerinizi reklam, profil oluşturma veya üçüncü taraflara satış amacıyla <strong>kullanmıyoruz</strong>.
            </p>
          </Section>

          <Section title="4. Veri Güvenliği">
            <p>
              Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri uyguluyoruz:
            </p>
            <ul>
              <li><strong>HTTPS şifrelemesi:</strong> Tüm veri transferleri SSL/TLS ile korunur.</li>
              <li><strong>Şifreli parola depolama:</strong> Parolalar bcrypt ile hash&#39;lenerek saklanır, düz metin olarak tutulmaz.</li>
              <li><strong>Erişim kontrolü:</strong> Verilerinize yalnızca yetkili kişiler ve sistemler erişebilir.</li>
              <li><strong>Güvenli altyapı:</strong> Supabase&#39;in GDPR uyumlu Avrupa merkezli altyapısı kullanılmaktadır.</li>
              <li><strong>Row Level Security (RLS):</strong> Veritabanı düzeyinde erişim politikaları uygulanmaktadır.</li>
            </ul>
          </Section>

          <Section title="5. Veri Paylaşımı ve Üçüncü Taraflar">
            <p>
              Kişisel verileriniz yalnızca platformun teknik işleyişi için zorunlu olan hizmet sağlayıcılarla paylaşılır:
            </p>
            <ul>
              <li><strong>Supabase:</strong> Veritabanı ve dosya depolama altyapısı (GDPR uyumlu)</li>
            </ul>
            <p>
              Bu dışında verileriniz hiçbir reklam ağı, analitik şirketi veya üçüncü tarafla paylaşılmaz.
            </p>
          </Section>

          <Section title="6. Fotoğraflarınız ve Medya İçerikleri">
            <p>
              Platforma yüklenen fotoğraflar, etkinlik sahibinin kontrolündeki özel bir galeride saklanır.
              Fotoğraflarınıza yalnızca etkinlik bağlantısına veya QR koduna sahip kişiler erişebilir.
            </p>
            <p>
              Etkinlik sahibi dilediği zaman fotoğrafları silebilir. Hesabınızı kapattığınızda veya talep ettiğinizde
              fotoğraflarınız kalıcı olarak silinir.
            </p>
            <p>
              AnıTopla, yüklenen fotoğrafları reklam, tanıtım veya başka amaçlarla kullanmaz.
            </p>
          </Section>

          <Section title="7. Çerezler ve Yerel Depolama">
            <p>
              Platformumuz yalnızca işlevsel amaçlarla çerez ve localStorage kullanır:
            </p>
            <ul>
              <li><strong>Oturum çerezi:</strong> Giriş yapmış kullanıcıların oturumunu sürdürmek için.</li>
              <li><strong>Misafir adı (localStorage):</strong> Etkinlik sayfasını yenilediğinizde adınızı tekrar girmenizi önlemek için.</li>
              <li><strong>Anonim token (localStorage):</strong> Fotoğraf beğeni ve tepkilerinizi takip etmek için. Bu token kişisel bilgi içermez.</li>
            </ul>
            <p>Üçüncü taraf izleme, reklam veya analitik çerezi kullanılmamaktadır.</p>
          </Section>

          <Section title="8. Çocukların Gizliliği">
            <p>
              AnıTopla&#39;nın hizmetleri 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşın altında olduğunu bildiğimiz
              kişilerden bilerek kişisel veri toplamıyoruz. Ebeveynler veya vasiler, çocuklarına ait verilerin işlendiğini
              fark ederlerse bizimle iletişime geçebilirler.
            </p>
          </Section>

          <Section title="9. Uluslararası Veri Transferleri">
            <p>
              Hizmet altyapımız Avrupa Birliği içinde yer almakta olup Avrupa Ekonomik Alanı dışına veri transferi
              gerçekleştirilmemektedir. Supabase GDPR uyumlu standart sözleşme maddelerine tabidir.
            </p>
          </Section>

          <Section title="10. Haklarınız">
            <p>Gizlilik politikamız kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Hakkınızdaki verilere erişim hakkı</li>
              <li>Yanlış verilerin düzeltilmesini talep hakkı</li>
              <li>Verilerinizin silinmesini talep hakkı (&quot;unutulma hakkı&quot;)</li>
              <li>Veri işlemeye itiraz hakkı</li>
              <li>Veri taşınabilirliği hakkı</li>
            </ul>
            <p>
              Bu haklarınızı kullanmak için <a href="mailto:info@anıtopla.com" className="text-brand-600 hover:underline">info@anıtopla.com</a> adresine yazabilirsiniz.
            </p>
          </Section>

          <Section title="11. Politika Değişiklikleri">
            <p>
              Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda, kayıtlı
              müşterilerimizi e-posta yoluyla bilgilendiririz. Güncel politikayı her zaman bu sayfada bulabilirsiniz.
            </p>
          </Section>

          <Section title="12. İletişim">
            <p>Bu politikayla ilgili sorularınız için:</p>
            <p>
              <strong>AnıTopla</strong><br />
              E-posta: <a href="mailto:info@anıtopla.com" className="text-brand-600 hover:underline">info@anıtopla.com</a>
            </p>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/kvkk" className="hover:text-brand-600 transition-colors">KVKK Aydınlatma Metni</Link>
          <span>·</span>
          <Link href="/kullanim-sartlari" className="hover:text-brand-600 transition-colors">Kullanım Şartları</Link>
          <span>·</span>
          <Link href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">{title}</h2>
      <div className="space-y-3 text-slate-600 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-slate-800">
        {children}
      </div>
    </div>
  )
}
