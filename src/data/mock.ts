import { Person, Tag, Post, GroupChat, DirectChat } from '@/types'

export const allTags: Tag[] = [
  { id: 'indie-music', name: 'インディーズバンド' },
  { id: 'cooking', name: '料理' },
  { id: 'career', name: 'キャリア' },
  { id: 'hiking', name: '登山' },
  { id: 'cycling', name: 'ロードバイク' },
  { id: 'art', name: 'アート・デザイン' },
  { id: 'parenting', name: '子育て' },
  { id: 'jazz', name: 'ジャズ' },
  { id: 'vintage', name: 'ヴィンテージ' },
  { id: 'photography', name: '写真' },
]

export const currentUser: Person = {
  id: 'me',
  name: '木村 あおい',
  department: 'マーケティング部',
  year: '入社1年目',
  matchScore: 100,
  isNearby: false,
  avatarColor: '#1D9E75',
  followingTags: ['indie-music', 'cooking', 'career'],
  tags: {
    hobby: ['音楽鑑賞', 'カフェ巡り'],
    value: ['好奇心', 'つながり'],
    obsessed: ['インディーズバンド開拓'],
    talk: ['音楽の話', 'キャリアの話'],
  },
  message: 'よろしくお願いします！',
}

export const people: Person[] = [
  {
    id: '1',
    name: '田中 莉子',
    department: '営業部',
    year: '入社2年目',
    matchScore: 78,
    isNearby: true,
    avatarColor: '#1D9E75',
    followingTags: ['indie-music', 'cooking', 'career', 'photography'],
    tags: {
      hobby: ['バンド鑑賞', '料理', '写真', 'ランニング'],
      value: ['誠実さ', '成長し続けること', 'チームワーク'],
      obsessed: ['インディーズバンド開拓', '発酵食品づくり'],
      talk: ['おすすめの音楽', '料理のレシピ', 'キャリアの話'],
    },
    message: '音楽と食で心をつなぎたい。気軽に話しかけてください！',
  },
  {
    id: '2',
    name: '佐藤 健太',
    department: '企画部',
    year: '入社8年目',
    matchScore: 62,
    isNearby: false,
    avatarColor: '#378ADD',
    followingTags: ['hiking', 'parenting'],
    tags: {
      hobby: ['登山', '子育て', 'キャンプ'],
      value: ['継続する力', '家族'],
      obsessed: ['百名山チャレンジ中', 'アウトドアギア'],
      talk: ['山の話', '子育ての話'],
    },
    message: '山と家族が人生の軸。一緒に高みを目指しましょう。',
  },
  {
    id: '3',
    name: '鈴木 誠',
    department: '営業部',
    year: '入社15年目',
    matchScore: 45,
    isNearby: true,
    avatarColor: '#BA7517',
    followingTags: ['cycling', 'jazz'],
    tags: {
      hobby: ['ロードバイク', 'ジャズ鑑賞'],
      value: ['信頼', '人の成長を見ること'],
      obsessed: ['100kmライド挑戦中'],
      talk: ['自転車の話', 'マネジメントの話'],
    },
    message: '走ることで学ぶことがある。ビジネスも人生も同じです。',
  },
  {
    id: '4',
    name: '山田 さくら',
    department: 'デザイン部',
    year: '入社3年目',
    matchScore: 91,
    isNearby: false,
    avatarColor: '#7F77DD',
    followingTags: ['indie-music', 'art', 'vintage'],
    tags: {
      hobby: ['インディーミュージック', 'ギャラリー巡り', 'ヴィンテージ古着'],
      value: ['美意識', '自分らしさ'],
      obsessed: ['ポスターデザイン'],
      talk: ['アート・デザインの話', '音楽の話'],
    },
    message: '美しいものに囲まれていると、仕事もうまくいく気がします。',
  },
]

export const posts: Post[] = [
  {
    id: 'post-1',
    authorId: '1',
    content: 'バンド好き集まれ！今週金曜18時、渋谷でミニライブ行きませんか？',
    createdAt: '2時間前',
    tagId: 'indie-music',
    comments: [
      { id: 'c1', authorId: '4', content: '行きたいです！', createdAt: '1時間前' },
      { id: 'c2', authorId: 'me', content: '私も！', createdAt: '30分前' },
    ],
  },
  {
    id: 'post-2',
    authorId: 'me',
    content: '来月、社内BBQ企画しています！参加希望の方はコメントください🔥',
    createdAt: '5時間前',
    tagId: null,
    comments: [
      { id: 'c3', authorId: '2', content: '参加します！', createdAt: '4時間前' },
    ],
  },
  {
    id: 'post-3',
    authorId: '2',
    content: '百名山チャレンジ仲間募集！来月、北アルプス行く予定です🏔',
    createdAt: '1日前',
    tagId: 'hiking',
    comments: [],
  },
  {
    id: 'post-4',
    authorId: '3',
    content: '新しい福利厚生として社内ジム利用補助の提案をしました。皆さんの意見を聞かせてください！',
    createdAt: '2日前',
    tagId: null,
    comments: [
      { id: 'c4', authorId: '1', content: 'ぜひ賛成です！', createdAt: '1日前' },
    ],
  },
  {
    id: 'post-5',
    authorId: '4',
    content: 'ヴィンテージ古着好きな人！今週末、下北沢のマーケット一緒に行きませんか👗',
    createdAt: '3日前',
    tagId: 'vintage',
    comments: [],
  },
]

export const groupChats: GroupChat[] = [
  {
    id: 'gc-1',
    tagId: 'indie-music',
    tagName: 'インディーズバンド',
    members: ['1', '4', 'me'],
    lastMessage: '今週金曜のライブ、誰か行きますか？',
    lastMessageAt: '14:32',
    unreadCount: 3,
  },
  {
    id: 'gc-2',
    tagId: 'cooking',
    tagName: '料理',
    members: ['1', 'me'],
    lastMessage: '発酵食品のレシピ共有します！',
    lastMessageAt: '昨日',
    unreadCount: 0,
  },
  {
    id: 'gc-3',
    tagId: 'career',
    tagName: 'キャリア',
    members: ['1', 'me'],
    lastMessage: 'キャリア相談乗りますよ〜',
    lastMessageAt: '月曜',
    unreadCount: 1,
  },
]

export const directChats: DirectChat[] = [
  {
    id: 'dc-1',
    memberId: '1',
    lastMessage: 'ありがとうございます！',
    lastMessageAt: '15:20',
    unreadCount: 1,
  },
  {
    id: 'dc-2',
    memberId: '4',
    lastMessage: 'またギャラリー行きましょう',
    lastMessageAt: '昨日',
    unreadCount: 0,
  },
]
