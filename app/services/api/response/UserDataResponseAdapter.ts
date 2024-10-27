import { UserDataResult } from '../../models'
import { UserDataResponseDTO } from '../dtos'

export class UserDataResponseAdapter {
  service(dto: UserDataResponseDTO): UserDataResult {
    return {
      bio: dto.bio,
      downvoted_comments: dto.downvoted_comments,
      downvoted_shared_questions: dto.downvoted_shared_questions,
      downvoted_threads: dto.downvoted_threads,
      importantInfo: dto.importantInfo,
      job: dto.job,
      reports: dto.reports,
      shared_questions: dto.shared_questions,
      upvoted_comments: dto.upvoted_comments,
      upvoted_shared_questions: dto.upvoted_shared_questions,
      upvoted_threads: dto.upvoted_threads,
      written_threads: dto.written_threads,
    }
  }
}
