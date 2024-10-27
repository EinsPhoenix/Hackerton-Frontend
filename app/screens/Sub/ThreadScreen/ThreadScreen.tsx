import React from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Image, Screen, Text } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useThread from './useThread'

export const ThreadScreen: React.FC<SubStackScreenProps<ScreenTypes.THREAD>> = observer(
  function Thread(_props) {
    const { data, handleGenerateQuiz, styles } = useThread()
    useRenderCount('ThreadScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="scroll"
        safeAreaEdges={['top', 'bottom']}>
        <Image
          source={data?.image_url}
          containerStyle={styles.imgContainer}
          style={styles.img}
          contentFit="cover"
        />
        <Text preset="h4">{data?.content}</Text>
        <Button
          leftIcon="AI"
          onPress={handleGenerateQuiz}
          preset="primary"
          tx="common.generateQuiz"
          buttonContainerStyle={styles.button}
        />
      </Screen>
    )
  },
)
