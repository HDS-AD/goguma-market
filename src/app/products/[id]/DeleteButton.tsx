'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('정말 삭제하시겠습니까? 삭제 후 복구가 불가능합니다.')) return

    setLoading(true)
    const { error } = await supabase.from('products').delete().eq('id', id)
    setLoading(false)

    if (error) {
      alert('삭제에 실패했습니다. 다시 시도해주세요.')
      return
    }
    router.push('/')
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex-1 py-3 rounded-lg border border-red-300 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? '삭제 중...' : '삭제하기'}
    </button>
  )
}
