export interface QuizResponseDTO {
  data: {
    questions: string[]
  }
}

export interface SolutionsResponseDTO {
  data: {
    score: number
    questions: string[]
  }
}
