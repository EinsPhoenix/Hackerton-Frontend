import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { appServices, ThreadResult } from 'app/services'
import { showErrorToast } from 'app/utils'

export const ThreadStoreModel = types
  .model('ThreadStore')
  .props({
    loading: types.optional(types.boolean, false),
    threadList: types.maybe(types.frozen<ThreadResult[]>()),
  })
  .views(store => ({
    get isLoading() {
      return store.loading
    },
    get threads() {
      return store.threadList
    },
  }))
  .actions(store => ({
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
    async searchThreads(searchTerm?: string) {
      try {
        this.setLoading(true)
        const params = {
          filters: { comments: true, jobs: true, tags: true, threads: true, user: true },
          search_term: searchTerm,
        }

        const response = await appServices.searchThreads(params)
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
  }))

export interface ThreadStore extends Instance<typeof ThreadStoreModel> {}
export interface ThreadStoreSnapshot extends SnapshotOut<typeof ThreadStoreModel> {}
