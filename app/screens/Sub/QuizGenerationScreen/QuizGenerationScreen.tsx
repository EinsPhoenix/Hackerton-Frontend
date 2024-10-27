import React from 'react'

import { observer } from 'mobx-react-lite'

import { Button, EmptyState, Image, ListItemSimple, ListView, Screen } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useQuizGeneration from './useQuizGeneration'

export const QuizGenerationScreen: React.FC<SubStackScreenProps<ScreenTypes.QUIZ_GENERATION>> =
  observer(function QuizGeneration(_props) {
    const { colors, data, handleRefetch, handleStartQuiz, quiz, styles } = useQuizGeneration()
    useRenderCount('QuizGenerationScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="fixed"
        safeAreaEdges={['top', 'bottom']}>
        <Image
          source={data?.image_url}
          containerStyle={styles.imgContainer}
          style={styles.img}
          contentFit="cover"
        />
        {quiz?.questions?.length === 0 ? (
          <EmptyState
            preset="generic"
            imageStyle={styles.imgNoContent}
            ImageProps={{ containerStyle: styles.imgNoContentContainer }}
            buttonOnPress={handleRefetch}
          />
        ) : (
          <ListView
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: string }) => (
              <ListItemSimple colors={colors} item={item} />
            )}
            data={quiz?.questions}
            estimatedItemSize={136}
          />
        )}
        <Button
          onPress={handleStartQuiz}
          preset="primary"
          tx="common.start"
          disabledTextStyle={styles.disabledText}
          disabled={!quiz?.questions || quiz?.questions?.length === 0}
          buttonContainerStyle={styles.button}
        />
      </Screen>
    )
  })
