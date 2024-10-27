import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { AuthenticationStoreModel } from './AuthenticationStore'
import { LibraryStoreModel } from './LibraryStore'
import { QuizStoreModel } from './QuizStore'
import { ThreadStoreModel } from './ThreadStore'

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  libraryStore: types.optional(LibraryStoreModel, {}),
  quizStore: types.optional(QuizStoreModel, {}),
  threadStore: types.optional(ThreadStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
