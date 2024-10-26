import { ThreadResult } from '../../models'
import { ThreadResponseDTO } from '../dtos'

export class ThreadResponseAdapter {
  private transform(dto: ThreadResponseDTO): ThreadResult {
    return {
      content: dto.content,
      content_summary: dto.content_summary,
      created_by: dto.created_by,
      id_thread: dto.id_thread,
      image_url: dto.image_url,
      title: dto.title,
      upvotes: dto.upvotes,
    }
  }

  service(dtos: ThreadResponseDTO[]): ThreadResult[] {
    return dtos.map(dto => this.transform(dto))
  }

  serviceSingle(dto: ThreadResponseDTO): ThreadResult {
    return this.transform(dto)
  }
}
