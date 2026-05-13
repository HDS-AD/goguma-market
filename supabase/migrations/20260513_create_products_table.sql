CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  seller_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT '판매중' CHECK (status IN ('판매중', '예약중', '판매완료')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
