/* eslint-disable camelcase */

import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { appServices, CheckParams, QuizParams, QuizResult, SolutionsResult } from 'app/services'
import { logger, showErrorToast } from 'app/utils'

export const QuizStoreModel = types
  .model('QuizStore')
  .props({
    loading: types.optional(types.boolean, false),
    quizList: types.maybe(types.frozen<QuizResult | null>()),
    solutionList: types.maybe(types.frozen<SolutionsResult | null>()),
  })
  .views(store => ({
    get isLoading() {
      return store.loading
    },
    get quiz() {
      return store.quizList
    },
    get solutions() {
      return store.solutionList
    },
  }))
  .actions(store => ({
    async generateQuiz(quizParams: QuizParams) {
      try {
        this.reset()
        this.setLoading(true)
        logger.log(quizParams)
        const response = await appServices.generateQuiz(quizParams)
        this.setQuiz(response)
      } catch (error: any) {
        showErrorToast('error.threads', error)
      } finally {
        this.setLoading(false)
      }
    },
    async postAnswers(checkParams: Omit<CheckParams, 'questions'>) {
      if (!store.quizList?.questions) return

      try {
        const response = await appServices.postAnswers({
          ...checkParams,
          questions: store.quizList.questions,
        })
        logger.log(response)
        this.setSolutions(response)
      } catch (error: any) {
        showErrorToast('error.threads', error)
      }
    },
    reset() {
      this.setQuiz(null)
      this.setSolutions(null)
      this.setLoading(false)
    },
    setLoading(value: boolean) {
      store.loading = value
    },
    setQuiz(quizList: QuizResult | null) {
      store.quizList = quizList
    },
    setSolutions(solutionList: SolutionsResult | null) {
      store.solutionList = solutionList
    },
  }))

export interface QuizStore extends Instance<typeof QuizStoreModel> {}
export interface QuizStoreSnapshot extends SnapshotOut<typeof QuizStoreModel> {}
