'use server'
 
import { db } from '@/lib/server/db'
import { revalidateTag } from 'next/cache'
 
export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const price = formData.get('price') as string
 
  // 1. Mutate data
  await db.products.update({
    where: { id },
    data: { name, price: parseFloat(price) }
  })
 
  // 2. Invalidate cache (Next.js 16.1.x requires second argument)
  revalidateTag(`product-${id}`, 'max')  // Specific product
  revalidateTag('products', 'max')        // Product list
 
  return { success: true }
}