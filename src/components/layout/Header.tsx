'use client'

import { usePathname } from 'next/navigation'

const titles: Record<string, string> = {
  '/': '',
  '/directory': '社内名鑑',
  '/nearby': '近くの人',
  '/connect': '繋がり',
}

export default function Header() {
  const pathname = usePathname()
  const isProfile = pathname.startsWith('/profile')
  const title = isProfile ? '' : titles[pathname] ?? ''

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
      <span className="font-bold text-2xl tracking-tight" style={{ color: '#1D9E75' }}>
        SYNC<span className="font-light text-gray-800">.</span>
      </span>
      {title && (
        <span className="text-sm font-semibold text-gray-500">{title}</span>
      )}
    </header>
  )
}
