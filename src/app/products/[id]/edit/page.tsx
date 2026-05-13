import { supabase, Product } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EditForm from './EditForm'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single<Product>()

  if (!product) notFound()

  return <EditForm product={product} />
}
