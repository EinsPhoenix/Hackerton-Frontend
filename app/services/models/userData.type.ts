import { ThreadResult } from 'app/services'

export interface UserDataResult {
  bio: string
  job: string
  importantInfo: ImportantInfoResult[]
  upvoted_threads: ThreadResult[]
  downvoted_threads: ThreadResult[]
  upvoted_comments: string[]
  downvoted_comments: string[]
  upvoted_shared_questions: string[]
  downvoted_shared_questions: string[]
  written_threads: ThreadResult[]
  shared_questions: string[]
  reports: string[]
}

export type UserDataParams = {
  username?: string
}

export interface ImportantInfoResult {
  information: string
  created_at: string
}
