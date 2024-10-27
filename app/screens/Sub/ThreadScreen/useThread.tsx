import React, { useEffect } from 'react'
import { View } from 'react-native'

import { useRoute } from '@react-navigation/native'

import { Icon, Text } from 'app/components'
import { useAppContext } from 'app/context'
import { RouteProps, ScreenTypes } from 'app/navigators'
import { useHeader } from 'app/utils'

import { threadStyles } from './Thread.style'

const useThread = () => {
  const { colors, navigation, services } = useAppContext()
  const {
    params: { item: data },
  } = useRoute<RouteProps<ScreenTypes.THREAD>>()

  const styles = threadStyles(colors)

  const goBack = () => {
    if (navigation.canGoBack()) return navigation.goBack()

    navigation.navigate(ScreenTypes.MAIN, { screen: ScreenTypes.HOME })
  }

  const handleGenerateQuiz = () => {
    navigation.navigate(ScreenTypes.SUB, {
      params: { item: data },
      screen: ScreenTypes.QUIZ_GENERATION,
    })
  }

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      onLeftPress: goBack,
      RightActionComponent: (
        <View style={styles.votingContainer}>
          <Text preset="h2" textAlign="right" color={colors.accent}>
            {data?.upvotes}
          </Text>
          <Icon icon="arrowup" library="AntDesign" color={colors.accent} size={24} />
        </View>
      ),
      title: data?.titel,
      titleMode: 'center',
    },
    [goBack],
  )

  useEffect(() => {
    if (data?.id_thread) {
      services.postThreadInfo({ id_thread: data.id_thread }).then()
    }
  }, [])

  return {
    data,
    handleGenerateQuiz,
    styles,
  }
}

export default useThread
