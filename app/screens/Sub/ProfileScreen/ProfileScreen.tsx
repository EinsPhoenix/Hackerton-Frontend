import React from 'react'

import { observer } from 'mobx-react-lite'

import { Screen, Text } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useProfile from './useProfile'

export const ProfileScreen: React.FC<SubStackScreenProps<ScreenTypes.PROFILE>> = observer(
  function Profile(_props) {
    const { jwtClaims, styles } = useProfile()
    useRenderCount('ProfileScreen')

    return (
      <Screen style={styles.container} preset="auto" safeAreaEdges={['top', 'bottom']}>
        <Text>{jwtClaims?.email}</Text>
      </Screen>
    )
  },
)
