import { PreferenceValue } from 'app/screens/Entry/WelcomeScreen/PreferencesList'

export interface ThreadResponseDTO {
  id_thread: number
  titel: string
  content: string
  content_summary: string
  main_tag: string
  subtags: string[]
  created_at: Date
  upvotes: number
  image_url: string
  created_by: string
}

export interface ThreadSearchResponseDTO {
  searchresult: {
    threadsmatching: ThreadResponseDTO[]
  }
}

export interface TagGeneratedResponseDTO {
  preferences: {
    MainTag: PreferenceValue
    SubTags: PreferenceValue[]
  }
}

export interface ContentGeneratedResponseDTO {
  content_summary: string
}
