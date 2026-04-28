import type { NextConfig } from 'next'
 
const config: NextConfig = {
  cacheComponents: true, // Top-level in Next.js 16.1.x+
  cacheLife: {
    blog: {
      stale: 3600, // 1 hour
      revalidate: 86400, // 24 hours
      expire: 604800, // 1 week
    },
    products: {
      stale: 30, // 5 minutes
      revalidate: 60, // 15 minutes
      expire: 120, // 1 hour
    },
    social: {
      stale: 60, // 1 minute
      revalidate: 300, // 5 minutes
      expire: 600, // 10 minutes
    },
  },
}
 
export default config