export interface ThreadResponseDTO {
  id_thread: number
  title: string
  content: string
  content_summary: string
  main_tag: string
  subtags: string[]
  created_at: Date
  upvotes: number
  image_url: string
  created_by: string
}
