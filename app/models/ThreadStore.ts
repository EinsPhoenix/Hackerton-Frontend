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
    async getThreads(searchTerm?: string) {
      try {
        this.setLoading(true)
        const response = await appServices.getThreads({ search_term: searchTerm })
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
    setThreads(threadList: ThreadResult[]) {
      store.threadList = threadList
    },
  }))

export interface ThreadStore extends Instance<typeof ThreadStoreModel> {}
export interface ThreadStoreSnapshot extends SnapshotOut<typeof ThreadStoreModel> {}
