import { QuizResult, SolutionsResult } from '../../models'
import { QuizResponseDTO, SolutionsResponseDTO } from '../dtos'

export class QuizResponseAdapter {
  service(dto: QuizResponseDTO): QuizResult {
    return {
      questions: dto.data.questions,
    }
  }

  serviceSolutions(dto: SolutionsResponseDTO): SolutionsResult {
    return {
      questions: dto.data.questions,
      score: dto.data.score,
    }
  }
}
