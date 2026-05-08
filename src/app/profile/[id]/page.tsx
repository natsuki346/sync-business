import { people } from '@/data/mock'
import { notFound } from 'next/navigation'

const tagConfig = {
  hobby:    { label: '🎵 趣味・好きなこと', bg: '#EAF3DE', color: '#3B6D11' },
  value:    { label: '💜 価値観',           bg: '#EEEDFE', color: '#3C3489' },
  obsessed: { label: '🔥 今夢中なこと',     bg: '#FAEEDA', color: '#633806' },
  talk:     { label: '💬 話しかけてほしいこと', bg: '#FAECE7', color: '#712B13' },
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const person = people.find(p => p.id === params.id)
  if (!person) notFound()

  const initials = person.name.replace(' ', '').slice(0, 2)

  return (
    <div>
      {/* Hero */}
      <div className="px-5 pt-8 pb-6 text-center" style={{ background: 'linear-gradient(160deg, #E1F5EE 0%, #ffffff 60%)' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-2xl mx-auto mb-3 border-4 border-white shadow"
          style={{ backgroundColor: person.avatarColor }}
        >
          {initials}
        </div>
        <div className="text-xl font-bold">{person.name}</div>
        <div className="text-sm text-gray-400 mt-1">{person.department}・{person.year}</div>
      </div>

      {/* 一致度 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4">
        <div className="text-4xl font-bold" style={{ color: '#1D9E75' }}>{person.matchScore}%</div>
        <div className="text-xs text-gray-400 mt-1 mb-3">アイデンティティ一致度</div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${person.matchScore}%`, background: 'linear-gradient(90deg, #1D9E75, #5DCAA5)' }}
          />
        </div>
      </div>

      {/* タグ */}
      {(Object.keys(tagConfig) as (keyof typeof tagConfig)[]).map(cat => (
        <div key={cat} className="mx-4 mt-3 bg-white rounded-2xl border border-gray-100 p-4">
          <div className="text-xs font-bold mb-2" style={{ color: tagConfig[cat].color }}>
            {tagConfig[cat].label}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {person.tags[cat].map(tag => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: tagConfig[cat].bg, color: tagConfig[cat].color }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* メッセージ */}
      <div className="mx-4 mt-3 p-4 rounded-2xl" style={{ backgroundColor: '#E1F5EE' }}>
        <div className="text-xs font-bold mb-1" style={{ color: '#1D9E75' }}>一言メッセージ</div>
        <div className="text-sm leading-relaxed" style={{ color: '#0F6E56' }}>{person.message}</div>
      </div>

      {/* CTAボタン */}
      <div className="mx-4 mt-4 mb-6">
        <button
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2"
          style={{ backgroundColor: '#1D9E75' }}
        >
          💬 話しかける
        </button>
      </div>
    </div>
  )
}
