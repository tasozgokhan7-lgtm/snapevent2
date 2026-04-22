import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Kullanım Şartları | Hatıra Topla',
  description: 'Hatıra Topla platformu kullanım şartları ve koşulları.',
}

export default function KullanimSartlariPage() {
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
          <span className="text-sm font-semibold text-slate-900">Hatıra Topla</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title block */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium mb-4">
            Yasal Bildirim
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Kullanım Şartları</h1>
          <p className="text-slate-500 text-sm">Son güncelleme: Nisan 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">

          <Section title="1. Taraflar ve Kapsam">
            <p>
              Bu Kullanım Şartları ("Şartlar"), <strong>Hatıra Topla</strong> ("Platform", "Biz") ile platformumuzu kullanan
              bireyler veya kurumlar ("Kullanıcı", "Siz") arasındaki hukuki ilişkiyi düzenlemektedir.
            </p>
            <p>
              Hatıra Topla&#39;ya erişerek veya platformu kullanarak bu Şartları kabul etmiş sayılırsınız.
              Bu Şartları kabul etmiyorsanız platformu kullanmayınız.
            </p>
          </Section>

          <Section title="2. Hizmetin Tanımı">
            <p>
              Hatıra Topla; düğün, nişan, doğum günü, mezuniyet ve benzeri etkinlik sahiplerine QR kod tabanlı
              kolektif fotoğraf galerisi hizmeti sunan çevrimiçi bir platformdur. Hizmet kapsamında:
            </p>
            <ul>
              <li>Etkinlik sahipleri ("Müşteriler") hesap oluşturabilir ve etkinlik galerileri yönetebilir,</li>
              <li>Etkinlik katılımcıları ("Misafirler") hesap açmadan QR kod aracılığıyla fotoğraf yükleyebilir,</li>
              <li>Yüklenen fotoğraflar tüm katılımcılarla gerçek zamanlı olarak paylaşılır.</li>
            </ul>
          </Section>

          <Section title="3. Kullanıcı Hesapları (Müşteriler)">
            <p>Müşteri hesabı oluşturmak için:</p>
            <ul>
              <li>Gerçek ve doğru bilgiler sağlamalısınız,</li>
              <li>Hesap güvenliğinizi sağlamak sizin sorumluluğunuzdadır,</li>
              <li>Hesabınızı başkasıyla paylaşmayınız,</li>
              <li>Hesabınızda yetkisiz erişim fark ederseniz derhal bize bildirin.</li>
            </ul>
          </Section>

          <Section title="4. Kabul Edilebilir Kullanım">
            <p>Platformu yalnızca yasal ve etik amaçlarla kullanabilirsiniz. Aşağıdaki eylemler kesinlikle yasaktır:</p>
            <ul>
              <li>Başkasının açık rızası olmaksızın fotoğrafını yüklemek</li>
              <li>Çıplaklık, şiddet veya müstehcen içerik içeren fotoğraf yüklemek</li>
              <li>Hakaret, iftira veya nefret söylemi içeren içerik paylaşmak</li>
              <li>Fikri mülkiyet haklarını ihlal eden içerik yüklemek</li>
              <li>Zararlı yazılım, spam veya kötü amaçlı kod dağıtmak</li>
              <li>Platformun teknik altyapısını bozmaya çalışmak</li>
              <li>Diğer kullanıcıların kişisel verilerini izinsiz toplamak veya kullanmak</li>
              <li>Ticari amaçlı reklam veya tanıtım yapmak</li>
            </ul>
          </Section>

          <Section title="5. Fotoğraflar ve İçerik Hakları">
            <p>
              Platforma yüklediğiniz fotoğrafların telif hakkı size aittir. Hatıra Topla, yüklenen içeriklerin
              mülkiyetini talep etmez.
            </p>
            <p>
              Bununla birlikte, içeriğinizi platforma yükleyerek Hatıra Topla&#39;ya aşağıdaki lisansı vermiş olursunuz:
              Hizmetin sağlanması, teknik işlemlerin yürütülmesi (kopyalama, depolama, yeniden boyutlandırma) ve
              platformun çalışması için gerekli kullanım hakkı. Bu lisans yalnızca hizmet amaçlıdır ve ticari amaçla kullanım içermez.
            </p>
            <p>
              Üçüncü şahıslara ait fotoğrafları yüklemek için o kişilerin iznini almak sizin sorumluluğunuzdadır.
              Başkalarına ait içerikleri izinsiz yüklemekten doğan tüm hukuki sorumluluk size aittir.
            </p>
          </Section>

          <Section title="6. İçerik Denetimi ve Kaldırma">
            <p>
              Hatıra Topla, bu Şartları ihlal ettiği değerlendirilen içerikleri önceden bildirim yapmaksızın
              kaldırma hakkını saklı tutar. Uygunsuz içerik tespit edilmesi veya şikayet alınması durumunda:
            </p>
            <ul>
              <li>İçerik derhal kaldırılabilir,</li>
              <li>İlgili kullanıcı hesabı askıya alınabilir veya kalıcı olarak kapatılabilir,</li>
              <li>Gerekli durumlarda yetkili makamlarla paylaşım yapılabilir.</li>
            </ul>
            <p>
              İçerik kaldırma taleplerini <a href="mailto:info@hatiratopla.com" className="text-brand-600 hover:underline">info@hatiratopla.com</a> adresine iletebilirsiniz.
            </p>
          </Section>

          <Section title="7. Fikri Mülkiyet">
            <p>
              Hatıra Topla platformunun tasarımı, yazılımı, logosu, marka adı ve tüm içerikleri Hatıra Topla&#39;ya aittir
              ve fikri mülkiyet hukuku kapsamında koruma altındadır. Bu materyallerin izinsiz kopyalanması,
              dağıtılması veya türev çalışma oluşturulması yasaktır.
            </p>
          </Section>

          <Section title="8. Hizmetin Sürekliliği ve Değişiklikler">
            <p>Hatıra Topla aşağıdaki hakları saklı tutar:</p>
            <ul>
              <li>Hizmeti önceden bildirimle veya zorunlu durumlarda bildirimsiz olarak geçici durdurmak veya sonlandırmak,</li>
              <li>Platform özelliklerini, fiyatlarını veya kullanım koşullarını değiştirmek,</li>
              <li>Belirli özelliklere erişimi sınırlandırmak.</li>
            </ul>
            <p>
              Önemli değişiklikler için kayıtlı müşteriler önceden e-posta ile bilgilendirilecektir.
            </p>
          </Section>

          <Section title="9. Sorumluluk Sınırlaması">
            <p>
              Hatıra Topla, kullanıcıların platforma yüklediği içeriklerden sorumlu değildir.
              Platformun kullanımından doğabilecek dolaylı, tesadüfi, özel veya sonuçsal zararlar için
              sorumluluğumuz, ilgili yasal düzenlemeler çerçevesinde azami ölçüde sınırlandırılmıştır.
            </p>
            <p>
              Platform &quot;olduğu gibi&quot; (as-is) sunulmaktadır. Hizmetin kesintisiz veya hatasız çalışacağına
              dair herhangi bir garanti verilmemektedir.
            </p>
          </Section>

          <Section title="10. Tazminat">
            <p>
              Bu Şartları ihlal etmenizden, içerik yüklemelerinizden veya platformun yanlış kullanımından
              kaynaklanan her türlü talep, dava veya zarar için Hatıra Topla&#39;yı ve çalışanlarını tazmin etmeyi
              kabul edersiniz.
            </p>
          </Section>

          <Section title="11. Hesap Sonlandırma">
            <p>
              Müşteri hesabınızı istediğiniz zaman <a href="mailto:info@hatiratopla.com" className="text-brand-600 hover:underline">info@hatiratopla.com</a> adresine e-posta göndererek
              silebilirsiniz. Hesap silme talebinin ardından verileriniz en geç 30 gün içinde sistemden kaldırılır.
            </p>
            <p>
              Bu Şartların ciddi ihlali durumunda Hatıra Topla, hesabınızı önceden bildirim yapmaksızın sonlandırabilir.
            </p>
          </Section>

          <Section title="12. Uygulanacak Hukuk ve Yetki">
            <p>
              Bu Şartlar Türkiye Cumhuriyeti hukukuna tabidir. Bu Şartlardan doğacak her türlü uyuşmazlıkta
              Türkiye mahkemeleri yetkilidir.
            </p>
          </Section>

          <Section title="13. Bölünebilirlik">
            <p>
              Bu Şartların herhangi bir hükmünün geçersiz veya uygulanamaz olduğuna karar verilmesi durumunda,
              söz konusu hüküm Şartlardan ayrı tutulur; geri kalan hükümler tam olarak geçerliliğini ve yürürlüğünü
              korur.
            </p>
          </Section>

          <Section title="14. Şartların Değiştirilmesi">
            <p>
              Hatıra Topla bu Şartları dilediği zaman güncelleme hakkını saklı tutar. Güncellenmiş Şartlar bu sayfada
              yayımlandığı tarihten itibaren geçerli olur. Platformu kullanmaya devam etmeniz, güncellenmiş Şartları
              kabul ettiğiniz anlamına gelir.
            </p>
          </Section>

          <Section title="15. İletişim">
            <p>
              Bu Şartlara ilişkin sorularınız veya ihlal bildirimleri için:
            </p>
            <p>
              <strong>Hatıra Topla</strong><br />
              E-posta: <a href="mailto:info@hatiratopla.com" className="text-brand-600 hover:underline">info@hatiratopla.com</a>
            </p>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/kvkk" className="hover:text-brand-600 transition-colors">KVKK Aydınlatma Metni</Link>
          <span>·</span>
          <Link href="/gizlilik" className="hover:text-brand-600 transition-colors">Gizlilik Politikası</Link>
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
