import { ThreadResult } from 'app/services'

export interface UserDataResponseDTO {
  username: string
  user_id: string
  bio: string
  job: string
  importantInfo: ImportantInfoResponseDTO[]
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

export interface ImportantInfoResponseDTO {
  information: string
  created_at: string
}

export interface PreferencesResponseDTO {
  preferences: {
    preference: string
    weight: number
  }
}
