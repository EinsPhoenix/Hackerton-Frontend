export interface ThreadResult {
  id_thread: number
  title: string
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

export interface AddThreadParams {
  title: string
  content: string
  content_summary: string
  main_tag: string
  subtags: string[]
  file: string
}
