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
      <body className={notoSansJP.className}>
        <div className="min-h-screen bg-gray-50 flex justify-center">
          <div className="w-full max-w-[390px] mx-auto relative">
            <Header />
            <main className="pb-28">
              {children}
            </main>
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  )
}
