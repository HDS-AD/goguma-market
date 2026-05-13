'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function NewProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image_url: '',
    seller_name: '',
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
    const { error } = await supabase.from('products').insert({
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      seller_name: form.seller_name.trim(),
    })

    setLoading(false)
    if (error) {
      setErrors({ submit: '등록에 실패했습니다. 다시 시도해주세요.' })
      return
    }
    router.push('/')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* 상단 띠 */}
      <div className="bg-[#cc0000] text-white text-xs text-center py-1 tracking-wide">
        믿을 수 있는 중고거래 플랫폼 — 고구마마켓
      </div>

      {/* 헤더 */}
      <header className="bg-[#1a2b5e] shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🍠</span>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">고구마마켓</h1>
              <p className="text-[10px] text-blue-200 tracking-widest mt-0.5">GOGUMA MARKET</p>
            </div>
          </Link>
        </div>
      </header>
      <div className="h-1 bg-[#cc0000]" />

      {/* 폼 */}
      <main className="max-w-2xl mx-auto px-6 py-10">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1a2b5e] mb-6 transition-colors">
          ← 목록으로
        </Link>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#1a2b5e] mb-8">상품 등록</h2>

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
                placeholder="상품명을 입력하세요"
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
                placeholder="0"
                min="0"
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1a2b5e] transition
                  ${errors.price ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>

            {/* 상품 설명 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">상품 설명</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="상품 상태, 구성품, 거래 방법 등을 자유롭게 적어주세요"
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
                placeholder="이름 또는 닉네임"
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1a2b5e] transition
                  ${errors.seller_name ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.seller_name && <p className="mt-1 text-xs text-red-500">{errors.seller_name}</p>}
            </div>

            {/* 서버 에러 */}
            {errors.submit && (
              <p className="text-sm text-red-500 text-center">{errors.submit}</p>
            )}

            {/* 버튼 */}
            <div className="flex gap-3 pt-2">
              <Link
                href="/"
                className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-600 text-sm font-semibold text-center hover:bg-gray-50 transition-colors"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-[#cc0000] hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? '등록 중...' : '등록'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-[#1a2b5e] text-blue-200 text-xs text-center py-6 mt-10">
        <p className="font-semibold text-white mb-1">고구마마켓 GOGUMA MARKET</p>
        <p>© 2026 Goguma Market. All rights reserved.</p>
      </footer>
    </div>
  )
}
