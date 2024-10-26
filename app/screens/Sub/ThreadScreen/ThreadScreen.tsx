import React from 'react'

import { observer } from 'mobx-react-lite'

import { Screen, Text } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useThread from './useThread'

export const ThreadScreen: React.FC<SubStackScreenProps<ScreenTypes.THREAD>> = observer(
  function Thread(_props) {
    const { styles } = useThread()
    useRenderCount('ThreadScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="fixed"
        safeAreaEdges={['top', 'bottom']}>
        <Text>ThreadScreen</Text>
      </Screen>
    )
  },
)
