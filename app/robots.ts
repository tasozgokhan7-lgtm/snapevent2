import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/musteri', '/musteri-girisi', '/e/'],
      },
    ],
    sitemap: 'https://hatiratopla.com/sitemap.xml',
  }
}
