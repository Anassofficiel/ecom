import type { MetadataRoute } from 'next'
import { products } from '@/lib/data'

const baseUrl = 'https://veneziaelectro.vercel.app'

// categories اللي تأكدنا بلي خدامين دابا
const categorySlugs = [
  'refrigerators',
  'washing-machines',
  'televisions',
  'air-fryers',
  'coffee-machines',
  'kitchen-appliances',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => product.isActive !== false)
    .map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  return [...staticPages, ...categoryPages, ...productPages]
}