import { supabase, Product } from '@/lib/supabase'

const statusStyle: Record<Product['status'], string> = {
  '판매중':   'bg-orange-100 text-orange-600',
  '예약중':   'bg-yellow-100 text-yellow-600',
  '판매완료': 'bg-gray-100 text-gray-400',
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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">🍠 고구마마켓</h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
            상품 등록
          </button>
        </div>
      </header>

      {/* 상품 목록 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-sm text-gray-500 mb-6">상품 {products?.length ?? 0}개</p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products?.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* 이미지 영역 */}
              <div className="bg-gray-100 aspect-square flex items-center justify-center text-5xl">
                🍠
              </div>

              {/* 상품 정보 */}
              <div className="p-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[product.status]}`}>
                  {product.status}
                </span>
                <p className={`mt-2 text-sm font-medium leading-snug line-clamp-2 ${product.status === '판매완료' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {product.title}
                </p>
                <p className={`mt-1 font-bold ${product.status === '판매완료' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                  {formatPrice(product.price)}
                </p>
                <p className="mt-1 text-xs text-gray-400">{product.seller_name}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
