import { PreferenceValue } from 'app/screens/Entry/WelcomeScreen/PreferencesList'

export interface ThreadResult {
  id_thread: number
  titel: string
  content: string
  content_summary: string
  upvotes: number
  image_url: string
  created_by: string
}

export interface TagGeneratedResult {
  preferences: {
    MainTag: {
      MainTag: PreferenceValue
    }
    SubTags: PreferenceValue[]
  }
}

export interface ContentGeneratedResult {
  content_summary: string
}

export interface ThreadParams {
  search_term?: string
  filters?: { user: boolean; tags: boolean; threads: boolean; comments: boolean }
}

export interface ThreadGenerateParams {
  titel: string
  content: string
  language_code?: string
}

export interface VotingParams {
  voteable: string
  voteable_id: number
  upvoteType: string
}

export interface AddThreadParams {
  titel: string
  content: string
  content_summary: string
  main_tag: PreferenceValue
  subtags: PreferenceValue[]
  file?: string
}

export interface ThreadInfoParams {
  id_thread: number
}
