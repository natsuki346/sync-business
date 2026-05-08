import Link from 'next/link'
import { Person } from '@/types'

const tagConfig = {
  hobby:    { label: '趣味', bg: '#EAF3DE', color: '#3B6D11' },
  value:    { label: '価値観', bg: '#EEEDFE', color: '#3C3489' },
  obsessed: { label: '夢中', bg: '#FAEEDA', color: '#633806' },
  talk:     { label: '話して', bg: '#FAECE7', color: '#712B13' },
}

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.replace(' ', '').slice(0, 2)
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}

export default function PersonCard({ person }: { person: Person }) {
  const topTags = [
    ...person.tags.hobby.slice(0, 2).map(t => ({ text: t, type: 'hobby' as const })),
    ...person.tags.value.slice(0, 1).map(t => ({ text: t, type: 'value' as const })),
  ]

  return (
    <Link href={`/profile/${person.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3 active:scale-[0.98] transition-transform">
        <div className="flex items-center gap-3">
          <Avatar name={person.name} color={person.avatarColor} />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[15px] text-gray-900">{person.name}</div>
            <div className="text-xs text-gray-400">{person.department}・{person.year}</div>
            {person.isNearby && (
              <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                📍 近くにいます
              </span>
            )}
          </div>
          <div
            className="text-sm font-bold px-3 py-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
          >
            {person.matchScore}%
          </div>
        </div>

        <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${person.matchScore}%`,
              background: 'linear-gradient(90deg, #1D9E75, #5DCAA5)',
            }}
          />
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {topTags.map(({ text, type }) => (
            <span
              key={text}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: tagConfig[type].bg,
                color: tagConfig[type].color,
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
