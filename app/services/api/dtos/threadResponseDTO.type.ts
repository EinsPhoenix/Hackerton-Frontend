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
