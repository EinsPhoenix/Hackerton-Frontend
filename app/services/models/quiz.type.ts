import { ContentLanguage } from 'app/i18n'

export interface QuizResult {
  questions: string[]
}

export interface QuizParams {
  language_code: ContentLanguage
  id_thread: number
}

export interface CheckParams extends QuizParams {
  questions: string[]
  answers: string[]
}

export interface SolutionsResult {
  score: number
  questions: string[]
}
