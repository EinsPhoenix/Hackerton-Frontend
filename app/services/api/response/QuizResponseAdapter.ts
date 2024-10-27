import { PreferencesResult, QuizResult, SolutionsResult } from '../../models'
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

  servicePrefs(dtos: any): PreferencesResult[] {
    return dtos.preferences.map((dto: any) => this.transform(dto))
  }

  transform(dto: any): PreferencesResult {
    return {
      preference: dto.preference,
      weight: dto.weight,
    }
  }
}
