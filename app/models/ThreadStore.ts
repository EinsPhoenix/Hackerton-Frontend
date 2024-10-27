/* eslint-disable camelcase */

import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { ContentLanguage } from 'app/i18n'
import { AddThreadParams, appServices, ThreadResult, VotingParams } from 'app/services'
import { showErrorToast } from 'app/utils'

export const ThreadStoreModel = types
  .model('ThreadStore')
  .props({
    loading: types.optional(types.boolean, false),
    threadList: types.maybe(types.frozen<ThreadResult[]>()),
  })
  .volatile(() => ({
    abortController: new AbortController(),
  }))
  .views(store => ({
    get isLoading() {
      return store.loading
    },
    get threads() {
      return store.threadList
    },
  }))
  .actions(store => ({
    async getAIContent(titel: string, content: string, language_code: ContentLanguage) {
      this.resetAbortController()

      try {
        this.setLoading(true)
        return await appServices.getAIContent(
          { content, language_code, titel },
          store.abortController.signal,
        )
      } catch (error: any) {
        showErrorToast('error.ai.content', error)
      } finally {
        this.setLoading(false)
      }

      return { content_summary: '' }
    },
    async getAITags(titel: string, content: string) {
      try {
        this.setLoading(true)
        return await appServices.getAITags({ content, titel })
      } catch (error: any) {
        showErrorToast('error.ai.tags', error)
      } finally {
        this.setLoading(false)
      }

      return {
        tags: {
          MainTag: {
            MainTag: '',
          },
          SubTags: [],
        },
      }
    },
    async getThreads(byScrolling?: boolean) {
      try {
        this.setLoading(true)
        const response = await appServices.getThreads({})
        this.setThreads(response, byScrolling)
      } catch (error: any) {
        showErrorToast('error.threads', error)
      } finally {
        this.setLoading(false)
      }
    },
    async postThread(addThreadParams: AddThreadParams) {
      try {
        this.setLoading(true)
        const response = await appServices.postThread(addThreadParams)
        this.setThreads([response], true)
        return true
      } catch (error: any) {
        showErrorToast('error.threads', error)
        return false
      } finally {
        this.setLoading(false)
      }
    },
    resetAbortController() {
      if (store.abortController) {
        store.abortController.abort()
      }
      store.abortController = new AbortController()
    },
    async searchThreads(searchTerm?: string) {
      this.resetAbortController()

      try {
        this.setLoading(true)
        const params = {
          filters: { comments: true, jobs: true, tags: true, threads: true, user: true },
          search_term: searchTerm,
        }

        const response = await appServices.searchThreads(params, store.abortController.signal)
        this.setThreads(response)
      } catch (error: any) {
        showErrorToast('error.threads', error)
      } finally {
        this.setLoading(false)
      }
    },
    setLoading(value: boolean) {
      store.loading = value
    },
    setThreads(threadList: ThreadResult[], byScrolling?: boolean) {
      if (byScrolling) {
        store.threadList = [...(store.threadList || []), ...threadList]
        return
      }

      store.threadList = threadList
    },
    async updateVoting(votingParams: VotingParams) {
      try {
        await appServices.updateVoting(votingParams)
      } catch (error: any) {
        showErrorToast('error.voting', error)
      }
    },
  }))

export interface ThreadStore extends Instance<typeof ThreadStoreModel> {}
export interface ThreadStoreSnapshot extends SnapshotOut<typeof ThreadStoreModel> {}
