import { supabase, Product } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const emojiMap: [string[], string][] = [
  [['아이폰', '갤럭시', '스마트폰', '휴대폰'], '📱'],
  [['맥북', '노트북', '랩탑'], '💻'],
  [['에어팟', '이어폰', '헤드폰', '이어버드'], '🎧'],
  [['아이패드', '태블릿', '갤탭'], '📟'],
  [['카메라', '렌즈', '미러리스', 'DSLR'], '📷'],
  [['닌텐도', '플스', '게임기', '스위치', '엑스박스'], '🎮'],
  [['마우스', '키보드', '모니터', '스피커'], '🖥️'],
  [['청소기', '로봇청소기', '다이슨'], '🧹'],
  [['에어랩', '드라이어', '고데기'], '💇'],
  [['밥솥', '냄비', '프라이팬', '에어프라이어'], '🍳'],
  [['커피', '에스프레소', '캡슐'], '☕'],
  [['토스터', '전자레인지', '오븐'], '🍞'],
  [['공기청정기', '가습기', '제습기', '선풍기'], '💨'],
  [['냉장고', '세탁기', '건조기'], '🏠'],
  [['의자', '체어', '소파', '쇼파'], '🪑'],
  [['책상', '테이블', '선반', '책장', '행거', '칼락스'], '🪵'],
  [['신발', '운동화', '구두', '슬리퍼', '에어맥스', '나이키', '아디다스'], '👟'],
  [['가방', '백팩', '크로스백', '파우치', '프라이탁'], '👜'],
  [['자전거', '킥보드', '전동'], '🚴'],
  [['텐트', '캠핑', '등산', '아웃도어'], '⛺'],
  [['덤벨', '헬스', '요가', '운동', '홈트'], '🏋️'],
  [['테니스', '라켓', '골프', '배드민턴'], '🎾'],
  [['레고', '블록', '피규어', '인형'], '🧱'],
  [['기타', '우쿨렐레', '피아노', '악기'], '🎸'],
  [['책', '도서', '만화'], '📚'],
  [['필름카메라', '폴라로이드'], '📸'],
]

function getProductEmoji(title: string): string {
  const lower = title.toLowerCase()
  for (const [keywords, emoji] of emojiMap) {
    if (keywords.some(k => lower.includes(k.toLowerCase()))) return emoji
  }
  return '🛍️'
}

const statusStyle: Record<Product['status'], string> = {
  '판매중':   'bg-blue-50 text-blue-700 border border-blue-200',
  '예약중':   'bg-yellow-50 text-yellow-700 border border-yellow-200',
  '판매완료': 'bg-gray-100 text-gray-400 border border-gray-200',
}

function formatPrice(price: number) {
  return `₩${price.toLocaleString('ko-KR')}`
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single<Product>()

  if (!product) notFound()

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* 상단 띠 */}
      <div className="bg-[#cc0000] text-white text-xs text-center py-1 tracking-wide">
        믿을 수 있는 중고거래 플랫폼 — HRS사내마켓
      </div>

      {/* 헤더 */}
      <header className="bg-[#1a2b5e] shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🍠</span>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">HRS사내마켓</h1>
              <p className="text-[10px] text-blue-200 tracking-widest mt-0.5">HRS INTERNAL MARKET</p>
            </div>
          </Link>
          <Link href="/products/new" className="bg-[#cc0000] hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded transition-colors">
            상품 등록
          </Link>
        </div>
      </header>

      <div className="h-1 bg-[#cc0000]" />

      {/* 상세 내용 */}
      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* 뒤로가기 */}
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1a2b5e] mb-6 transition-colors">
          ← 목록으로
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">

          {/* 이미지 */}
          <div className="bg-gray-50 aspect-video flex items-center justify-center text-8xl border-b border-gray-100">
            {product.image_url ? (
              <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              getProductEmoji(product.title)
            )}
          </div>

          {/* 정보 */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded ${statusStyle[product.status]}`}>
                {product.status}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(product.created_at).toLocaleDateString('ko-KR')}
              </span>
            </div>

            <h2 className={`text-2xl font-bold mt-2 ${product.status === '판매완료' ? 'text-gray-400' : 'text-gray-900'}`}>
              {product.title}
            </h2>

            <p className={`text-3xl font-bold mt-3 ${product.status === '판매완료' ? 'text-gray-300 line-through' : 'text-[#1a2b5e]'}`}>
              {formatPrice(product.price)}
            </p>

            <div className="border-t border-gray-100 mt-6 pt-6">
              <p className="text-sm font-semibold text-gray-500 mb-2">상품 설명</p>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description ?? '상품 설명이 없습니다.'}
              </p>
            </div>

            <div className="border-t border-gray-100 mt-6 pt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a2b5e] flex items-center justify-center text-white font-bold text-sm">
                {product.seller_name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{product.seller_name}</p>
                <p className="text-xs text-gray-400">판매자</p>
              </div>
            </div>

            {/* 문의 버튼 */}
            <button
              disabled={product.status === '판매완료'}
              className="mt-6 w-full py-3 rounded-lg font-semibold text-white transition-colors
                bg-[#cc0000] hover:bg-red-700
                disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {product.status === '판매완료' ? '판매 완료된 상품입니다' : '판매자에게 문의하기'}
            </button>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-[#1a2b5e] text-blue-200 text-xs text-center py-6 mt-10">
        <p className="font-semibold text-white mb-1">HRS사내마켓 HRS INTERNAL MARKET</p>
        <p>© 2026 Goguma Market. All rights reserved.</p>
      </footer>
    </div>
  )
}
