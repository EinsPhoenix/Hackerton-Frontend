import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { getRootStore } from 'app/models/helpers/getRootStore'
import { appServices, UserDataResult } from 'app/services'
import { showErrorToast } from 'app/utils'

export const LibraryStoreModel = types
  .model('LibraryStore')
  .props({
    loading: types.optional(types.boolean, false),
    userRelatedData: types.maybe(types.frozen<UserDataResult>()),
  })
  .volatile(() => ({
    abortController: new AbortController(),
  }))
  .views(store => ({
    get isLoading() {
      return store.loading
    },
    get userData() {
      return store.userRelatedData
    },
  }))
  .actions(store => ({
    async getUserRelatedData() {
      this.resetAbortController()

      try {
        this.setLoading(true)
        const username = getRootStore(store).authenticationStore.claims?.username
        const response = await appServices.getUserData({ username }, store.abortController.signal)
        this.setUserData(response)
      } catch (error: any) {
        showErrorToast('error.userData', error)
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
    setLoading(value: boolean) {
      store.loading = value
    },
    setUserData(userRelatedData: UserDataResult) {
      store.userRelatedData = userRelatedData
    },
  }))

export interface LibraryStore extends Instance<typeof LibraryStoreModel> {}
export interface LibraryStoreSnapshot extends SnapshotOut<typeof LibraryStoreModel> {}
