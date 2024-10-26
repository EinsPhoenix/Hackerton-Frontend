import { ContentGeneratedResult, TagGeneratedResult, ThreadResult } from '../../models'
import {
  ContentGeneratedResponseDTO,
  TagGeneratedResponseDTO,
  ThreadResponseDTO,
  ThreadSearchResponseDTO,
} from '../dtos'

export class ThreadResponseAdapter {
  private transform(dto: ThreadResponseDTO): ThreadResult {
    return {
      content: dto.content,
      content_summary: dto.content_summary,
      created_by: dto.created_by,
      id_thread: dto.id_thread,
      image_url: dto.image_url,
      titel: dto.titel,
      upvotes: dto.upvotes,
    }
  }

  service(dtos: ThreadResponseDTO[]): ThreadResult[] {
    return dtos.map(dto => this.transform(dto))
  }

  serviceSearch(dto: ThreadSearchResponseDTO): ThreadResult[] {
    return dto.searchresult.threadsmatching.map(dtoItem => this.transform(dtoItem))
  }

  serviceGeneratedTags(dto: TagGeneratedResponseDTO): TagGeneratedResult {
    return {
      preferences: {
        MainTag: {
          MainTag: dto.preferences.MainTag,
        },
        SubTags: dto.preferences.SubTags,
      },
    }
  }

  serviceGeneratedContent(dto: ContentGeneratedResponseDTO): ContentGeneratedResult {
    return {
      content_summary: dto.content_summary,
    }
  }

  serviceSingle(dto: ThreadResponseDTO): ThreadResult {
    return this.transform(dto)
  }
}
