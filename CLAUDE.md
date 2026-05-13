# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**고구마마켓** — 중고 물품을 사고팔 수 있는 한국어 웹 서비스.

## 기술 스택

- **Next.js** (App Router)
- **Supabase** (데이터베이스, 인증)
- **Tailwind CSS** (스타일링)
- **TypeScript**

## MCP

Supabase MCP가 연결되어 있음. DB 조작은 MCP를 통해 직접 수행.

## 개발 규칙

- UI는 한국어로 작성
- 가격은 원화(₩) 표시 — `₩10,000` 형태
- 모바일 반응형 필수
- 디자인은 깔끔하고 모던한 스타일
- 색상 테마: 딥 네이비(`#1a2b5e`) + 레드(`#cc0000`) — HRS코리아 스타일

## 환경변수 (.env.local)

새 컴퓨터에서 작업 시 아래 파일을 직접 생성해야 함 (GitHub에 없음):
```
NEXT_PUBLIC_SUPABASE_URL=https://wyndcqpetnvfkitakeht.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(Supabase 대시보드에서 anon key 확인)
```

## 주요 기능

- 상품 목록 (메인 페이지)
- 상품 등록 / 상세 / 수정 / 삭제
- 소셜 로그인 (카카오 / 구글)
- 결제 (토스페이먼츠)
