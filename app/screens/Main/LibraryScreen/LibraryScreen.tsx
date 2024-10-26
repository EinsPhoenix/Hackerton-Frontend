import React from 'react'

import { observer } from 'mobx-react-lite'

import { LoadingAnimation, Screen } from 'app/components'
import type { MainTabScreenProps, ScreenTypes } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useLibrary from './useLibrary'

export const LibraryScreen: React.FC<MainTabScreenProps<ScreenTypes.LIBRARY>> = observer(
  function Library(_props) {
    const { isLoading, styles } = useLibrary()
    useRenderCount('LibraryScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="auto"
        safeAreaEdges={['top', 'bottom']}>
        <LoadingAnimation loading={isLoading} />
      </Screen>
    )
  },
)
