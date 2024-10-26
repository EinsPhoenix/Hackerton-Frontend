import { ThreadResult } from 'app/services'

// TODO REPLACE WITH RIGHT TYPES
export interface UserDataResponseDTO {
  username: string
  user_id: string
  bio: string
  job: string
  importantInfo: string[]
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
