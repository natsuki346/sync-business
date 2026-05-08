'use client'

import { useState } from 'react'
import Link from 'next/link'
import { people, allTags, currentUser } from '@/data/mock'
import { Person } from '@/types'

// 苗字の頭文字（漢字）→ 読み仮名 の対応表
const kanjiToKana: Record<string, string> = {
  '阿': 'あ', '安': 'あ', '青': 'あ', '赤': 'あ', '秋': 'あ', '芦': 'あ',
  '加': 'か', '川': 'か', '金': 'か', '上': 'か', '神': 'か',
  '木': 'き', '菊': 'き', '岸': 'き',
  '久': 'く', '国': 'く', '黒': 'く', '桑': 'く', '熊': 'く',
  '小': 'こ', '古': 'こ', '河': 'こ', '近': 'こ',
  '佐': 'さ', '齋': 'さ', '斉': 'さ', '坂': 'さ', '酒': 'さ', '桜': 'さ',
  '島': 'し', '白': 'し', '清': 'し', '柴': 'し', '下': 'し',
  '鈴': 'す', '杉': 'す', '須': 'す',
  '関': 'せ', '瀬': 'せ',
  '曽': 'そ', '園': 'そ',
  '田': 'た', '高': 'た', '竹': 'た', '谷': 'た', '橘': 'た', '太': 'た',
  '千': 'ち', '近': 'ち',
  '土': 'つ', '辻': 'つ', '鶴': 'つ',
  '寺': 'て',
  '戸': 'と', '土': 'と', '富': 'と', '豊': 'と',
  '中': 'な', '長': 'な', '永': 'な', '梨': 'な', '奈': 'な',
  '西': 'に', '新': 'に',
  '沼': 'ぬ',
  '野': 'の', '能': 'の',
  '橋': 'は', '林': 'は', '原': 'は', '浜': 'は', '花': 'は', '萩': 'は',
  '平': 'ひ', '広': 'ひ', '樋': 'ひ',
  '藤': 'ふ', '深': 'ふ', '福': 'ふ', '古': 'ふ',
  '星': 'ほ', '本': 'ほ', '堀': 'ほ',
  '前': 'ま', '牧': 'ま', '松': 'ま', '丸': 'ま', '増': 'ま',
  '三': 'み', '宮': 'み', '水': 'み', '南': 'み', '皆': 'み',
  '向': 'む', '村': 'む', '武': 'む',
  '目': 'め',
  '森': 'も', '元': 'も', '望': 'も', '毛': 'も',
  '山': 'や', '矢': 'や', '安': 'や', '柳': 'や', '谷': 'や',
  '吉': 'よ', '横': 'よ', '四': 'よ',
  '若': 'わ', '渡': 'わ', '和': 'わ', '脇': 'わ',
}

const kanaRows = [
  { label: 'あ', chars: 'あいうえお' },
  { label: 'か', chars: 'かきくけこ' },
  { label: 'さ', chars: 'さしすせそ' },
  { label: 'た', chars: 'たちつてと' },
  { label: 'な', chars: 'なにぬねの' },
  { label: 'は', chars: 'はひふへほ' },
  { label: 'ま', chars: 'まみむめも' },
  { label: 'や', chars: 'やゆよ' },
  { label: 'ら', chars: 'らりるれろ' },
  { label: 'わ', chars: 'わをん' },
]

function getKanaRow(name: string): string {
  const firstChar = name.replace(/\s/g, '')[0]
  const kana = kanjiToKana[firstChar] ?? firstChar
  for (const row of kanaRows) {
    if (row.chars.includes(kana)) return row.label
  }
  return 'わ'
}

function sortByKana(a: Person, b: Person): number {
  const indexA = kanaRows.findIndex(r => r.label === getKanaRow(a.name))
  const indexB = kanaRows.findIndex(r => r.label === getKanaRow(b.name))
  if (indexA !== indexB) return indexA - indexB
  return a.name.localeCompare(b.name, 'ja')
}

const allPeople = [...people, currentUser]

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  let filtered: Person[]
  if (searchQuery) {
    filtered = allPeople.filter(p => p.name.includes(searchQuery))
  } else if (selectedTag) {
    filtered = allPeople.filter(p => p.followingTags.includes(selectedTag))
  } else {
    filtered = allPeople
  }
  filtered = [...filtered].sort(sortByKana)

  const grouped = kanaRows
    .map(row => ({
      label: row.label,
      members: filtered.filter(p => getKanaRow(p.name) === row.label),
    }))
    .filter(g => g.members.length > 0)

  const activeLabels = new Set(grouped.map(g => g.label))

  return (
    <div className="relative">
      {/* Sticky search + tag bar */}
      <div className="sticky top-[65px] z-40 bg-white border-b border-gray-100">
        <div className="px-4 pt-3 pb-2">
          <input
            type="text"
            placeholder="名前で検索..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              if (e.target.value) setSelectedTag(null)
            }}
            className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-none">
          <button
            onClick={() => { setSelectedTag(null); setSearchQuery('') }}
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            style={
              selectedTag === null && !searchQuery
                ? { backgroundColor: '#1D9E75', color: '#fff' }
                : { backgroundColor: '#F3F4F6', color: '#6B7280' }
            }
          >
            すべて
          </button>
          {allTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => {
                setSelectedTag(tag.id === selectedTag ? null : tag.id)
                setSearchQuery('')
              }}
              className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={
                selectedTag === tag.id
                  ? { backgroundColor: '#1D9E75', color: '#fff' }
                  : { backgroundColor: '#F3F4F6', color: '#6B7280' }
              }
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* List + right kana index */}
      <div className="flex">
        <div className="flex-1 min-w-0 pr-7">
          {grouped.length === 0 ? (
            <div className="text-sm text-gray-400 text-center py-12">該当する社員が見つかりません</div>
          ) : (
            grouped.map(({ label, members }) => (
              <div key={label} id={`section-${label}`} className="scroll-mt-44">
                <div
                  className="px-4 py-1.5 text-xs font-bold tracking-widest"
                  style={{ color: '#1D9E75', backgroundColor: '#F0FBF7' }}
                >
                  {label}行
                </div>
                {members.map((person, i) => (
                  <Link key={person.id} href={`/profile/${person.id}`}>
                    <div
                      className={`flex items-center gap-3 px-4 py-3 active:bg-gray-50 transition-colors ${
                        i < members.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                        style={{ backgroundColor: person.avatarColor }}
                      >
                        {person.name.replace(/\s/g, '').slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{person.name}</div>
                        <div className="text-xs text-gray-400">{person.department}・{person.year}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Kana index */}
        <div className="fixed right-1 top-1/2 -translate-y-1/2 flex flex-col z-30">
          {kanaRows.map(({ label }) => (
            <button
              key={label}
              onClick={() => {
                const el = document.getElementById(`section-${label}`)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="w-6 h-6 flex items-center justify-center text-[11px] font-bold"
              style={{ color: activeLabels.has(label) ? '#1D9E75' : '#D1D5DB' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
