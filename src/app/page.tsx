import { supabase, Product } from '@/lib/supabase'
import Link from 'next/link'

const statusStyle: Record<Product['status'], string> = {
  '판매중':   'bg-blue-50 text-blue-700 border border-blue-200',
  '예약중':   'bg-yellow-50 text-yellow-700 border border-yellow-200',
  '판매완료': 'bg-gray-100 text-gray-400 border border-gray-200',
}

function formatPrice(price: number) {
  return `₩${price.toLocaleString('ko-KR')}`
}

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="text-center mt-20 text-red-500">데이터를 불러오지 못했습니다.</p>
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* 상단 띠 */}
      <div className="bg-[#cc0000] text-white text-xs text-center py-1 tracking-wide">
        믿을 수 있는 중고거래 플랫폼 — 고구마마켓
      </div>

      {/* 헤더 */}
      <header className="bg-[#1a2b5e] shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍠</span>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">고구마마켓</h1>
              <p className="text-[10px] text-blue-200 tracking-widest mt-0.5">GOGUMA MARKET</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-blue-100">
            <a href="#" className="hover:text-white transition-colors">전체상품</a>
            <a href="#" className="hover:text-white transition-colors">인기상품</a>
            <a href="#" className="hover:text-white transition-colors">나의 거래</a>
          </nav>
          <Link href="/products/new" className="bg-[#cc0000] hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded transition-colors">
            상품 등록
          </Link>
        </div>
      </header>

      {/* 히어로 배너 */}
      <section className="bg-[#1a2b5e] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-300 text-sm mb-1 tracking-widest">TRUSTED SECOND-HAND TRADING</p>
          <h2 className="text-3xl font-bold">믿을 수 있는 중고거래,<br />고구마마켓에서 시작하세요.</h2>
        </div>
      </section>

      {/* 구분선 포인트 */}
      <div className="h-1 bg-[#cc0000]" />

      {/* 상품 목록 */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#1a2b5e]">전체 상품</h3>
          <span className="text-sm text-gray-400">총 {products?.length ?? 0}개</span>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {products?.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 cursor-pointer border border-gray-100 block"
            >
              {/* 이미지 */}
              <div className="bg-gray-50 aspect-square flex items-center justify-center text-5xl border-b border-gray-100">
                🍠
              </div>

              {/* 정보 */}
              <div className="p-3">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${statusStyle[product.status]}`}>
                  {product.status}
                </span>
                <p className={`mt-2 text-sm font-medium leading-snug line-clamp-2 ${product.status === '판매완료' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {product.title}
                </p>
                <p className={`mt-1 text-base font-bold ${product.status === '판매완료' ? 'text-gray-300 line-through' : 'text-[#1a2b5e]'}`}>
                  {formatPrice(product.price)}
                </p>
                <p className="mt-1 text-xs text-gray-400">{product.seller_name}</p>
              </div>
            </Link>
          ))}
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
