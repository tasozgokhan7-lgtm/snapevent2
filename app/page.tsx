import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import EventTypesSection from '@/components/landing/EventTypesSection'
import WhyUsSection from '@/components/landing/WhyUsSection'
import FaqSection from '@/components/landing/FaqSection'
import ContactSection from '@/components/landing/ContactSection'
import WhatsAppButton from '@/components/public/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Hatıra Topla — Düğün ve Etkinlik Fotoğraf Paylaşım Platformu',
  description:
    'QR kod ile misafirleriniz anında fotoğraf yüklesin, ortak galeri oluşsun. Düğün, nişan, doğum günü ve her etkinlik için Türkiye\'nin en kolay fotoğraf paylaşım platformu. Hesap açmaya gerek yok.',
  alternates: {
    canonical: 'https://hatiratopla.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://hatiratopla.com/#organization',
      name: 'Hatıra Topla',
      url: 'https://hatiratopla.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hatiratopla.com/logo.png',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@hatiratopla.com',
        contactType: 'customer service',
        availableLanguage: 'Turkish',
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://hatiratopla.com/#website',
      url: 'https://hatiratopla.com',
      name: 'Hatıra Topla',
      description: 'QR Kod ile Etkinlik Fotoğraf Paylaşım Platformu',
      publisher: { '@id': 'https://hatiratopla.com/#organization' },
      inLanguage: 'tr-TR',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Hatıra Topla',
      operatingSystem: 'Web, iOS, Android',
      applicationCategory: 'PhotographyApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'TRY',
        description: 'İletişim formunu doldurun, size teklif gönderelim.',
      },
      description:
        'Düğün, nişan, doğum günü ve tüm etkinlikler için QR kod tabanlı kolektif fotoğraf galerisi. Misafirler hesap açmadan anında fotoğraf yükler.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Misafirler hesap açmak zorunda mı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hayır. Misafirler sadece QR kodu okutarak etkinlik sayfasına ulaşır, adını girer ve fotoğraf yükler. Herhangi bir kayıt veya giriş işlemi gerekmez.',
          },
        },
        {
          '@type': 'Question',
          name: 'QR kodu nasıl oluşturuyorum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hatıra Topla, etkinlik için benzersiz bir bağlantı oluşturur. Baskıya hazır QR kod tasarımlarını size e-posta ile göndeririz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kaç kişi aynı anda fotoğraf yükleyebilir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Altyapımız eş zamanlı yüzlerce yüklemeyi destekler. Büyük düğün ve kurumsal etkinliklerde dahi sorunsuz çalışır.',
          },
        },
        {
          '@type': 'Question',
          name: 'Yüklenen fotoğrafları denetleyebilir miyim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Müşteri panelinizden tüm yüklenen fotoğrafları görebilir, uygunsuz içerikleri silebilirsiniz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Mobil cihazlarda çalışıyor mu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Hatıra Topla mobil öncelikli tasarlanmıştır. iOS ve Android cihazlarda, tüm modern tarayıcılarda mükemmel çalışır.',
          },
        },
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <EventTypesSection />
        <WhyUsSection />
        <FaqSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  )
}
