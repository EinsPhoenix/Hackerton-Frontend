import React from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { Screen, Text } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import RadarChart from 'app/screens/Sub/ProfileScreen/RadarChart'
import { useRenderCount } from 'app/utils'

import Header from './Header'
import useProfile from './useProfile'

export const ProfileScreen: React.FC<SubStackScreenProps<ScreenTypes.PROFILE>> = observer(
  function Profile(_props) {
    const {
      colors,
      handleChangeImage,
      handleDelete,
      image,
      jwtClaims,
      styles,
      userData,
      weightedPreferences,
    } = useProfile()
    useRenderCount('ProfileScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="auto"
        safeAreaEdges={['top', 'bottom']}>
        <Header
          jwtClaims={jwtClaims}
          handleDelete={handleDelete}
          handleChangeImage={handleChangeImage}
          image={image}
        />
        <View style={styles.content}>
          <View style={styles.column}>
            <Text preset="h3" color={colors.accent} tx="screen.profile.bio" />
            <Text preset="h5" text={userData?.bio} />
          </View>
          <View style={styles.column}>
            <Text preset="h3" color={colors.accent} tx="screen.profile.job" />
            <Text preset="h5" text={userData?.job} />
          </View>
        </View>
        <RadarChart colors={colors} weightedPreferences={weightedPreferences} />
      </Screen>
    )
  },
)
