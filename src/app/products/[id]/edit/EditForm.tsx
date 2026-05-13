'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Product } from '@/lib/supabase'

export default function EditForm({ product }: { product: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    title: product.title,
    price: String(product.price),
    description: product.description ?? '',
    image_url: product.image_url ?? '',
    seller_name: product.seller_name,
    status: product.status,
  })

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!form.title.trim()) newErrors.title = '상품명을 입력해주세요.'
    if (!form.price) newErrors.price = '가격을 입력해주세요.'
    else if (Number(form.price) < 0) newErrors.price = '가격은 0원 이상이어야 합니다.'
    if (!form.seller_name.trim()) newErrors.seller_name = '판매자 이름을 입력해주세요.'
    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    const { error } = await supabase
      .from('products')
      .update({
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim() || null,
        image_url: form.image_url.trim() || null,
        seller_name: form.seller_name.trim(),
        status: form.status,
      })
      .eq('id', product.id)

    setLoading(false)
    if (error) {
      setErrors({ submit: '수정에 실패했습니다. 다시 시도해주세요.' })
      return
    }
    router.push(`/products/${product.id}`)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <div className="bg-[#cc0000] text-white text-xs text-center py-1 tracking-wide">
        믿을 수 있는 중고거래 플랫폼 — HRS사내마켓
      </div>

      <header className="bg-[#1a2b5e] shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🍠</span>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">HRS사내마켓</h1>
              <p className="text-[10px] text-blue-200 tracking-widest mt-0.5">HRS INTERNAL MARKET</p>
            </div>
          </Link>
        </div>
      </header>
      <div className="h-1 bg-[#cc0000]" />

      <main className="max-w-2xl mx-auto px-6 py-10">
        <Link href={`/products/${product.id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1a2b5e] mb-6 transition-colors">
          ← 상세 페이지로
        </Link>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#1a2b5e] mb-8">상품 수정</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* 상품명 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                상품명 <span className="text-[#cc0000]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1a2b5e] transition
                  ${errors.title ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* 가격 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                가격 (₩) <span className="text-[#cc0000]">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1a2b5e] transition
                  ${errors.price ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>

            {/* 판매 상태 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">판매 상태</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1a2b5e] transition bg-white"
              >
                <option value="판매중">판매중</option>
                <option value="예약중">예약중</option>
                <option value="판매완료">판매완료</option>
              </select>
            </div>

            {/* 상품 설명 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">상품 설명</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1a2b5e] transition resize-none"
              />
            </div>

            {/* 이미지 URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">이미지 URL</label>
              <input
                type="text"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1a2b5e] transition"
              />
            </div>

            {/* 판매자 이름 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                판매자 이름 <span className="text-[#cc0000]">*</span>
              </label>
              <input
                type="text"
                name="seller_name"
                value={form.seller_name}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1a2b5e] transition
                  ${errors.seller_name ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.seller_name && <p className="mt-1 text-xs text-red-500">{errors.seller_name}</p>}
            </div>

            {errors.submit && (
              <p className="text-sm text-red-500 text-center">{errors.submit}</p>
            )}

            <div className="flex gap-3 pt-2">
              <Link
                href={`/products/${product.id}`}
                className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-600 text-sm font-semibold text-center hover:bg-gray-50 transition-colors"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-[#1a2b5e] hover:bg-blue-900 text-white text-sm font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? '저장 중...' : '저장'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-[#1a2b5e] text-blue-200 text-xs text-center py-6 mt-10">
        <p className="font-semibold text-white mb-1">HRS사내마켓 HRS INTERNAL MARKET</p>
        <p>© 2026 HRS Internal Market. All rights reserved.</p>
      </footer>
    </div>
  )
}
