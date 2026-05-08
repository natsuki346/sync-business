import Link from 'next/link'
import { Person } from '@/types'

export default function HeroCard({ person }: { person: Person }) {
  const initials = person.name.replace(' ', '').slice(0, 2)

  return (
    <Link href={`/profile/${person.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 w-40 flex-shrink-0 active:scale-[0.98] transition-transform">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm mb-2"
          style={{ backgroundColor: person.avatarColor }}
        >
          {initials}
        </div>
        <div className="font-semibold text-[13px] text-gray-900 mb-0.5">{person.name}</div>
        <div className="text-[11px] text-gray-400 mb-2">{person.department}</div>
        <div
          className="text-xs font-bold px-2.5 py-1 rounded-full inline-block"
          style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
        >
          {person.matchScore}% 一致
        </div>
      </div>
    </Link>
  )
}
