import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'SYNC.',
  description: '社内アイデンティティ名鑑',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} bg-gray-200 min-h-screen flex items-center justify-center`}>
        <div
          style={{
            width: 390,
            height: 844,
            borderRadius: 40,
            boxShadow: '0 0 0 8px #1a1a1a, 0 20px 60px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            position: 'relative',
            background: 'white',
            transform: 'translateZ(0)',
          }}
        >
          <div className="h-full overflow-y-auto">
            <Header />
            <main className="pb-28">
              {children}
            </main>
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  )
}
