'use client'

import { useState } from 'react'
import Link from 'next/link'
import { people, currentUser, posts as initialPosts, allTags } from '@/data/mock'
import { Post, Comment, Person } from '@/types'

type Tab = 'board' | 'community'

function findPerson(authorId: string): Person {
  if (authorId === 'me') return currentUser
  return people.find(p => p.id === authorId) ?? currentUser
}

function MiniAvatar({ person, size = 9 }: { person: Person; size?: number }) {
  const cls = size === 7
    ? 'w-7 h-7 text-[10px]'
    : 'w-9 h-9 text-xs'
  return (
    <div
      className={`${cls} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: person.avatarColor }}
    >
      {person.name.replace(/\s/g, '').slice(0, 2)}
    </div>
  )
}

function PostCard({
  post,
  posts,
  setPosts,
}: {
  post: Post
  posts: Post[]
  setPosts: (p: Post[]) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [commentText, setCommentText] = useState('')
  const author = findPerson(post.authorId)
  const tagInfo = post.tagId ? allTags.find(t => t.id === post.tagId) : null
  const canComment = post.tagId === null || currentUser.followingTags.includes(post.tagId)

  const addComment = () => {
    if (!commentText.trim()) return
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      authorId: 'me',
      content: commentText.trim(),
      createdAt: 'たった今',
    }
    setPosts(posts.map(p =>
      p.id === post.id ? { ...p, comments: [...p.comments, newComment] } : p
    ))
    setCommentText('')
  }

  return (
    <div className="border-b border-gray-100 px-4 py-4">
      <div className="flex gap-3">
        <Link href={`/profile/${author.id}`} className="flex-shrink-0">
          <MiniAvatar person={author} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-sm font-bold text-gray-900">{author.name}</span>
            <span className="text-xs text-gray-400">{post.createdAt}</span>
          </div>
          {tagInfo && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block mb-2"
              style={{ backgroundColor: '#E1F5EE', color: '#1D9E75' }}
            >
              #{tagInfo.name}
            </span>
          )}
          <p className="text-sm text-gray-800 leading-relaxed">{post.content}</p>
          <button
            className="flex items-center gap-1.5 mt-3 text-xs text-gray-400 active:text-gray-600"
            onClick={() => setExpanded(e => !e)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {post.comments.length > 0 ? `${post.comments.length}件のコメント` : 'コメントする'}
          </button>

          {expanded && (
            <div className="mt-3 space-y-2.5">
              {post.comments.map(comment => {
                const ca = findPerson(comment.authorId)
                return (
                  <div key={comment.id} className="flex gap-2">
                    <MiniAvatar person={ca} size={7} />
                    <div className="bg-gray-50 rounded-xl px-3 py-2 flex-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-semibold text-gray-700">{ca.name}</span>
                        <span className="text-[10px] text-gray-400">{comment.createdAt}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">{comment.content}</div>
                    </div>
                  </div>
                )
              })}

              {canComment ? (
                <div className="flex gap-2 pt-1">
                  <MiniAvatar person={currentUser} size={7} />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="コメントを追加..."
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addComment()}
                      className="flex-1 bg-gray-100 rounded-xl px-3 py-1.5 text-xs outline-none"
                    />
                    <button
                      onClick={addComment}
                      disabled={!commentText.trim()}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white disabled:opacity-40"
                      style={{ backgroundColor: '#1D9E75' }}
                    >
                      送信
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-400 text-center py-2 bg-gray-50 rounded-xl">
                  #{tagInfo?.name} をフォローするとコメントできます
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('board')
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostTagId, setNewPostTagId] = useState<string | null>(null)
  const [selectedCommunityTag, setSelectedCommunityTag] = useState<string | null>(null)

  const boardPosts = posts.filter(p => p.tagId === null)
  const communityPosts = posts.filter(p => {
    if (p.tagId === null || !currentUser.followingTags.includes(p.tagId)) return false
    if (selectedCommunityTag !== null) return p.tagId === selectedCommunityTag
    return true
  })
  const displayedPosts = activeTab === 'board' ? boardPosts : communityPosts

  const followingTagObjects = allTags.filter(t => currentUser.followingTags.includes(t.id))

  const openModal = () => {
    setNewPostContent('')
    setNewPostTagId(activeTab === 'community' ? (currentUser.followingTags[0] ?? null) : null)
    setIsModalOpen(true)
  }

  const submitPost = () => {
    if (!newPostContent.trim()) return
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: 'me',
      content: newPostContent.trim(),
      createdAt: 'たった今',
      tagId: activeTab === 'board' ? null : newPostTagId,
      comments: [],
    }
    setPosts([newPost, ...posts])
    setNewPostContent('')
    setNewPostTagId(null)
    setIsModalOpen(false)
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="sticky top-[65px] z-40 bg-white border-b border-gray-100 px-4 flex">
        {(['board', 'community'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSelectedCommunityTag(null) }}
            className="py-3 mr-5 text-sm font-semibold border-b-2 transition-colors"
            style={
              activeTab === tab
                ? { borderColor: '#1D9E75', color: '#1D9E75' }
                : { borderColor: 'transparent', color: '#9CA3AF' }
            }
          >
            {tab === 'board' ? '全社掲示板' : 'コミュニティ'}
          </button>
        ))}
      </div>

      {/* Community tag filter */}
      {activeTab === 'community' && (
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none border-b border-gray-100">
          <button
            onClick={() => setSelectedCommunityTag(null)}
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            style={
              selectedCommunityTag === null
                ? { backgroundColor: '#1D9E75', color: '#fff' }
                : { backgroundColor: '#F3F4F6', color: '#6B7280' }
            }
          >
            #すべて
          </button>
          {followingTagObjects.map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedCommunityTag(tag.id === selectedCommunityTag ? null : tag.id)}
              className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={
                selectedCommunityTag === tag.id
                  ? { backgroundColor: '#1D9E75', color: '#fff' }
                  : { backgroundColor: '#F3F4F6', color: '#6B7280' }
              }
            >
              #{tag.name}
            </button>
          ))}
        </div>
      )}

      {/* Post list */}
      <div>
        {displayedPosts.length === 0 ? (
          <div className="text-sm text-gray-400 text-center py-16">投稿がありません</div>
        ) : (
          displayedPosts.map(post => (
            <PostCard key={post.id} post={post} posts={posts} setPosts={setPosts} />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={openModal}
        className="fixed z-40 shadow-lg flex items-center justify-center rounded-full"
        style={{ right: 24, bottom: 100, width: 56, height: 56, backgroundColor: '#1D9E75' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      {/* Post modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={e => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 pb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-base text-gray-900">
                {activeTab === 'board' ? '全社掲示板に投稿' : 'コミュニティに投稿'}
              </span>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {activeTab === 'community' && (
              <select
                value={newPostTagId ?? ''}
                onChange={e => setNewPostTagId(e.target.value || null)}
                className="w-full bg-gray-100 rounded-xl px-3 py-2.5 text-sm outline-none mb-3"
              >
                {followingTagObjects.map(tag => (
                  <option key={tag.id} value={tag.id}>#{tag.name}</option>
                ))}
              </select>
            )}

            <textarea
              placeholder="何を共有しますか？"
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
              rows={4}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none resize-none mb-4"
              autoFocus
            />

            <button
              onClick={submitPost}
              disabled={!newPostContent.trim()}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-opacity disabled:opacity-40"
              style={{ backgroundColor: '#1D9E75' }}
            >
              投稿する
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
