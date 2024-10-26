import React from 'react'
import { View } from 'react-native'

import { Images } from 'assets/images'
import { observer } from 'mobx-react-lite'

import { Button, Image, LoadingAnimation, Screen, Text } from 'app/components'
import { type AppStackScreenProps, ScreenTypes } from 'app/navigators'
import PreferencesList from 'app/screens/Entry/WelcomeScreen/PreferencesList'
import { useRenderCount } from 'app/utils'

import useWelcome from './useWelcome'

export const WelcomeScreen: React.FC<AppStackScreenProps<ScreenTypes.WELCOME>> = observer(
  function Welcome(_props) {
    const { goNext, isLoading, prefs, setPrefs, styles } = useWelcome()
    useRenderCount('WelcomeScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="auto"
        safeAreaEdges={['top', 'bottom']}>
        <LoadingAnimation loading={isLoading} />
        <View style={styles.topContainer}>
          <Image
            containerStyle={styles.imgContainer}
            style={styles.img}
            source={Images.APP_IMAGE}
          />
          <View style={styles.topText}>
            <Text tx="screen.welcome.readyForLaunch" preset="h1" />
            <Text tx="screen.welcome.exciting" preset="h2" weight="light" />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text tx="screen.welcome.postscript" preset="h6" />
          <PreferencesList preferences={prefs} setPreferences={setPrefs} />

          <Button
            testID="next-screen-button"
            preset="primary"
            tx="screen.welcome.letsGo"
            onPress={goNext}
            buttonContainerStyle={styles.button}
            disabled={prefs.every(pref => pref.chosen === 0)}
            disabledStyle={styles.disabled}
            disabledTextStyle={styles.disabledText}
          />
        </View>
      </Screen>
    )
  },
)
