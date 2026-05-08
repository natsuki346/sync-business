export type TagCategory = 'hobby' | 'value' | 'obsessed' | 'talk'

export interface Tag {
  id: string
  name: string
}

export interface Person {
  id: string
  name: string
  department: string
  year: string
  matchScore: number
  isNearby: boolean
  tags: Record<TagCategory, string[]>
  followingTags: string[]
  message: string
  avatarColor: string
}

export interface Comment {
  id: string
  authorId: string
  content: string
  createdAt: string
}

export interface Post {
  id: string
  authorId: string
  content: string
  createdAt: string
  tagId: string | null
  comments: Comment[]
}

export interface GroupChat {
  id: string
  tagId: string
  tagName: string
  members: string[]
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}

export interface DirectChat {
  id: string
  memberId: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}
