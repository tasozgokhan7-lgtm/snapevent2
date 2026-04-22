import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'KVKK Aydınlatma Metni | AnıTopla',
  description: 'AnıTopla platformu KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.',
}

export default function KvkkPage() {
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-medium mb-4">
            Yasal Bildirim
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">KVKK Aydınlatma Metni</h1>
          <p className="text-slate-500 text-sm">Son güncelleme: Nisan 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">

          <Section title="1. Veri Sorumlusunun Kimliği">
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla
              <strong> AnıTopla</strong> tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <p>
              İletişim: <a href="mailto:info@anıtopla.com" className="text-brand-600 hover:underline">info@anıtopla.com</a>
            </p>
          </Section>

          <Section title="2. İşlenen Kişisel Veriler">
            <p>AnıTopla hizmetlerinden yararlanmanız kapsamında aşağıdaki kişisel veriler işlenmektedir:</p>
            <ul>
              <li><strong>Misafirler (Etkinlik Katılımcıları):</strong> Ad ve soyad (isteğe bağlı), yüklenen fotoğraflar, yükleme tarihi ve saati, tarayıcı bazlı anonim oturum tanımlayıcısı.</li>
              <li><strong>Müşteriler (Etkinlik Sahipleri):</strong> Ad soyad, e-posta adresi, şifre (şifrelenmiş olarak), etkinlik adı ve tarihi, etkinlik fotoğraf galerisine ilişkin meta veriler.</li>
              <li><strong>İletişim Formu Kullanıcıları:</strong> Ad soyad, e-posta adresi veya telefon numarası, etkinlik türü, etkinlik tarihi, mesaj içeriği.</li>
            </ul>
          </Section>

          <Section title="3. Kişisel Verilerin İşlenme Amaçları">
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul>
              <li>Etkinlik galerisinin oluşturulması ve paylaşılması,</li>
              <li>Misafirlerin etkinliğe anonim veya isimli katılımının sağlanması,</li>
              <li>Müşteri hesabının yönetimi ve platformun sunulması,</li>
              <li>Talep ve şikâyetlerin cevaplanması, iletişim kurulması,</li>
              <li>Hizmet kalitesinin iyileştirilmesi ve platformun güvenliğinin sağlanması,</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
            </ul>
          </Section>

          <Section title="4. Kişisel Verilerin İşlenme Hukuki Sebepleri">
            <p>Kişisel verileriniz KVKK'nın 5. maddesi kapsamında aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:</p>
            <ul>
              <li><strong>Açık rıza:</strong> Fotoğraf yükleme ve galeri paylaşımı işlemleri için açık rızanıza dayanılmaktadır.</li>
              <li><strong>Sözleşmenin kurulması veya ifası:</strong> Müşteri hesabı işlemleri ve platform hizmetlerinin sunulması için.</li>
              <li><strong>Meşru menfaat:</strong> Hizmet güvenliğinin sağlanması ve iletişim yönetimi amacıyla.</li>
              <li><strong>Hukuki yükümlülük:</strong> Yasal mevzuattan doğan yükümlülüklerin yerine getirilmesi için.</li>
            </ul>
          </Section>

          <Section title="5. Kişisel Verilerin Aktarılması">
            <p>
              Kişisel verileriniz; yalnızca hizmetin sunulabilmesi için gerekli olan teknik altyapı sağlayıcılarına (bulut depolama, veritabanı hizmetleri) KVKK'nın 8. ve 9. maddeleri çerçevesinde aktarılabilmektedir.
              Verileriniz üçüncü taraf reklam şirketleriyle veya başka amaçlarla paylaşılmamaktadır.
            </p>
            <p>
              Platformumuz, veri depolama altyapısı olarak <strong>Supabase</strong> hizmetini kullanmaktadır. Bu hizmet Avrupa Birliği veri merkezlerinde faaliyet göstermekte olup GDPR (KVKK ile örtüşen AB veri koruma mevzuatı) uyumlu şekilde yönetilmektedir.
            </p>
          </Section>

          <Section title="6. Kişisel Veri Saklama Süreleri">
            <p>Kişisel verileriniz aşağıdaki sürelerle saklanmaktadır:</p>
            <ul>
              <li><strong>Etkinlik fotoğrafları:</strong> Etkinlik sahibinin belirlediği süre veya hesap silinene kadar.</li>
              <li><strong>Müşteri hesap bilgileri:</strong> Hesap aktif olduğu süre boyunca ve sözleşme sona erme tarihinden itibaren 3 yıl.</li>
              <li><strong>İletişim formu verileri:</strong> Talebinizin sonuçlandırılmasından itibaren 1 yıl.</li>
              <li><strong>Teknik log kayıtları:</strong> 6 ay.</li>
            </ul>
          </Section>

          <Section title="7. Veri Sahibinin Hakları">
            <p>KVKK'nın 11. maddesi uyarınca kişisel verilerinize ilişkin aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenen kişisel verileriniz hakkında bilgi talep etme,</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
              <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
              <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
            </ul>
            <p>
              Haklarınızı kullanmak için <a href="mailto:info@anıtopla.com" className="text-brand-600 hover:underline">info@anıtopla.com</a> adresine e-posta gönderebilirsiniz.
              Talebiniz en geç 30 gün içinde sonuçlandırılacaktır.
            </p>
          </Section>

          <Section title="8. Çerezler (Cookies)">
            <p>
              AnıTopla, platformun işlevselliğini sağlamak amacıyla oturum çerezleri (session cookies) ve yerel depolama (localStorage) kullanmaktadır.
              Bu veriler; misafirin adının hatırlanması, anonim oturum tanımlayıcısının saklanması gibi teknik amaçlarla kullanılır.
              Reklam veya profil oluşturma amaçlı çerez kullanılmamaktadır.
            </p>
          </Section>

          <Section title="9. Değişiklikler">
            <p>
              Bu aydınlatma metni, yasal gereklilikler veya hizmetlerimizdeki değişiklikler nedeniyle güncellenebilir.
              Güncel metin her zaman bu sayfada yayımlanır. Önemli değişikliklerde müşterilerimiz e-posta ile bilgilendirilir.
            </p>
          </Section>

          <Section title="10. İletişim">
            <p>
              Bu aydınlatma metni veya kişisel verilerinize ilişkin her türlü soru ve talebiniz için:
            </p>
            <p>
              <strong>AnıTopla</strong><br />
              E-posta: <a href="mailto:info@anıtopla.com" className="text-brand-600 hover:underline">info@anıtopla.com</a>
            </p>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/gizlilik" className="hover:text-brand-600 transition-colors">Gizlilik Politikası</Link>
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
