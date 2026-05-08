'use client'

import { useState } from 'react'
import Link from 'next/link'
import { directChats, people, currentUser } from '@/data/mock'
import { Person } from '@/types'

interface Message {
  id: string
  authorId: string
  content: string
  time: string
}

const initialMessages: Record<string, Message[]> = {
  'dc-1': [
    { id: 'm1', authorId: '1', content: '先日はありがとうございました！', time: '15:18' },
    { id: 'm2', authorId: 'me', content: 'こちらこそ！またランチ行きましょう', time: '15:19' },
    { id: 'm3', authorId: '1', content: 'ありがとうございます！', time: '15:20' },
  ],
  'dc-2': [
    { id: 'm1', authorId: '4', content: 'またギャラリー行きましょう', time: '昨日' },
  ],
}

function findPerson(id: string): Person {
  if (id === 'me') return currentUser
  return people.find(p => p.id === id) ?? currentUser
}

export default function DirectChatPage({ params }: { params: { id: string } }) {
  const chat = directChats.find(d => d.id === params.id)
  const partner = chat ? findPerson(chat.memberId) : null
  const [messages, setMessages] = useState<Message[]>(initialMessages[params.id] ?? [])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages(prev => [
      ...prev,
      { id: `m-${Date.now()}`, authorId: 'me', content: input.trim(), time: '今' },
    ])
    setInput('')
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <Link href="/chat" className="text-gray-400 p-1 -ml-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        {partner && (
          <>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
              style={{ backgroundColor: partner.avatarColor }}
            >
              {partner.name.replace(/\s/g, '').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 text-sm">{partner.name}</div>
              <div className="text-xs text-gray-400">{partner.department}</div>
            </div>
            <Link
              href={`/profile/${partner.id}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#E1F5EE', color: '#1D9E75' }}
            >
              プロフィール
            </Link>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4">
        {messages.map(msg => {
          const isMe = msg.authorId === 'me'
          const author = findPerson(msg.authorId)
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {!isMe && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 self-end"
                  style={{ backgroundColor: author.avatarColor }}
                >
                  {author.name.replace(/\s/g, '').slice(0, 2)}
                </div>
              )}
              <div className={`max-w-[70%] flex flex-col gap-0.5 ${isMe ? 'items-end' : 'items-start'}`}>
                <div
                  className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    isMe
                      ? { backgroundColor: '#1D9E75', color: '#fff', borderBottomRightRadius: 4 }
                      : { backgroundColor: '#F3F4F6', color: '#1F2937', borderBottomLeftRadius: 4 }
                  }
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-4 py-3 pb-6 flex gap-2">
        <input
          type="text"
          placeholder="メッセージを入力..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 flex-shrink-0"
          style={{ backgroundColor: '#1D9E75' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  )
}
