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
  .volatile(() => ({
    abortController: new AbortController(),
  }))
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
      this.resetAbortController()

      try {
        this.reset()
        this.setLoading(true)
        logger.log(quizParams)
        const response = await appServices.generateQuiz(quizParams, store.abortController.signal)
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
        this.setLoading(true)
        const response = await appServices.postAnswers({
          ...checkParams,
          questions: store.quizList.questions,
        })
        logger.log(response)
        this.setSolutions(response)
      } catch (error: any) {
        showErrorToast('error.threads', error)
      } finally {
        this.setLoading(false)
      }
    },
    reset() {
      this.setQuiz(null)
      this.setSolutions(null)
      this.setLoading(false)
    },
    resetAbortController() {
      if (store.abortController) {
        store.abortController.abort()
      }
      store.abortController = new AbortController()
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
