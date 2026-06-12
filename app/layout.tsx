import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const BASE_URL = 'https://hatiratopla.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Hatıra Topla — Düğün ve Etkinlik Fotoğraf Paylaşım Platformu',
    template: '%s | Hatıra Topla',
  },
  description:
    'QR kod ile misafirleriniz anında fotoğraf yüklesin, ortak galeri oluşsun. Düğün, nişan, doğum günü ve her etkinlik için Türkiye\'nin en kolay fotoğraf paylaşım platformu.',
  keywords: [
    'düğün fotoğraf paylaşım',
    'etkinlik fotoğraf galerisi',
    'qr kod fotoğraf paylaşım',
    'düğün galeri uygulaması',
    'misafir fotoğraf yükleme',
    'etkinlik hatıra fotoğraf',
    'düğün anı topla',
    'hatıra topla',
    'nişan fotoğraf paylaşım',
    'doğum günü galeri',
    'etkinlik QR kod galeri',
    'misafir fotoğraf galerisi',
    'online fotoğraf albümü düğün',
    'düğün fotoğraf uygulaması türkiye',
  ],
  authors: [{ name: 'Hatıra Topla', url: BASE_URL }],
  creator: 'Hatıra Topla',
  publisher: 'Hatıra Topla',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: BASE_URL,
    siteName: 'Hatıra Topla',
    title: 'Hatıra Topla — Düğün ve Etkinlik Fotoğraf Paylaşım Platformu',
    description:
      'QR kod okutun, misafirleriniz anında fotoğraf yüklesin. Düğün, nişan, doğum günü — tüm anlar ortak galeride toplanır. Hesap açmaya gerek yok.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hatıra Topla — QR Kod ile Etkinlik Fotoğraf Galerisi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hatıra Topla — Düğün ve Etkinlik Fotoğraf Paylaşım Platformu',
    description:
      'QR kod okutun, misafirleriniz anında fotoğraf yüklesin. Düğün, nişan, doğum günü — tüm anlar ortak galeride.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Google Search Console doğrulama kodu buraya gelecek
    // google: 'buraya_google_site_verification_kodunu_girin',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-HTJ9YFE01L" />
    </html>
  )
}
