import { ThreadResult } from 'app/services'

// TODO REPLACE WITH RIGHT TYPES
export interface UserDataResult {
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

export type UserDataParams = object
