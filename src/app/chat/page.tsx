'use client'

import { useState } from 'react'
import Link from 'next/link'
import { groupChats, directChats, people, allTags } from '@/data/mock'

type Tab = 'group' | 'direct'

const tagColors: Record<string, string> = {
  'indie-music': '#7F77DD',
  'cooking': '#1D9E75',
  'career': '#378ADD',
  'hiking': '#3B6D11',
  'cycling': '#BA7517',
  'art': '#712B13',
  'parenting': '#633806',
  'jazz': '#0F6E56',
  'vintage': '#3C3489',
  'photography': '#9CA3AF',
}

function findPerson(id: string) {
  return people.find(p => p.id === id)
}

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<Tab>('group')
  const [search, setSearch] = useState('')

  const searchResults = search
    ? people.filter(p => p.name.includes(search))
    : []

  return (
    <div>
      {/* Tab bar */}
      <div className="sticky top-[65px] z-40 bg-white border-b border-gray-100 px-4 flex">
        {(['group', 'direct'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch('') }}
            className="py-3 mr-5 text-sm font-semibold border-b-2 transition-colors"
            style={
              activeTab === tab
                ? { borderColor: '#1D9E75', color: '#1D9E75' }
                : { borderColor: 'transparent', color: '#9CA3AF' }
            }
          >
            {tab === 'group' ? 'グループ' : 'ダイレクト'}
          </button>
        ))}
      </div>

      {activeTab === 'group' && (
        <div>
          {groupChats.map(gc => {
            const color = tagColors[gc.tagId] ?? '#9CA3AF'
            return (
              <Link key={gc.id} href={`/chat/group/${gc.id}`}>
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 active:bg-gray-50 transition-colors">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-base flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    #
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold text-gray-900 truncate">
                        #{gc.tagName}
                      </span>
                      <span className="text-[11px] text-gray-400 flex-shrink-0">{gc.lastMessageAt}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-xs text-gray-400 truncate">{gc.lastMessage}</span>
                      {gc.unreadCount > 0 && (
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: '#1D9E75' }}
                        >
                          {gc.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-300 mt-0.5">{gc.members.length}人のメンバー</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {activeTab === 'direct' && (
        <div>
          <div className="px-4 pt-3 pb-2">
            <input
              type="text"
              placeholder="メンバーを検索..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none"
            />
          </div>

          {search ? (
            <div>
              {searchResults.length === 0 ? (
                <div className="text-sm text-gray-400 text-center py-8">該当するメンバーがいません</div>
              ) : (
                searchResults.map(person => (
                  <Link key={person.id} href={`/chat/direct/dc-${person.id}`}>
                    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 active:bg-gray-50 transition-colors">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
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
                ))
              )}
            </div>
          ) : (
            <div>
              {directChats.map(dc => {
                const person = findPerson(dc.memberId)
                if (!person) return null
                return (
                  <Link key={dc.id} href={`/chat/direct/${dc.id}`}>
                    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 active:bg-gray-50 transition-colors">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                        style={{ backgroundColor: person.avatarColor }}
                      >
                        {person.name.replace(/\s/g, '').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-bold text-gray-900">{person.name}</span>
                          <span className="text-[11px] text-gray-400 flex-shrink-0">{dc.lastMessageAt}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <span className="text-xs text-gray-400 truncate">{dc.lastMessage}</span>
                          {dc.unreadCount > 0 && (
                            <span
                              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                              style={{ backgroundColor: '#1D9E75' }}
                            >
                              {dc.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
