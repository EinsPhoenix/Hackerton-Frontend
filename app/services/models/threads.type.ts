export interface ThreadResult {
  id_thread: number
  titel: string
  content: string
  content_summary: string
  upvotes: number
  image_url: string
  created_by: string
}

export interface ThreadParams {
  search_term?: string
  filters?: { user: boolean; tags: boolean; threads: boolean; comments: boolean }
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
  main_tag: string
  subtags: string[]
  file: string
}
