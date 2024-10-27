import React from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, EmptyState, ListItemSimple, ListView, Screen, Text } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import CircleDiagram from 'app/screens/Sub/ResultScreen/CircleDiagram'
import { useRenderCount } from 'app/utils'

import useResult from './useResult'

export const ResultScreen: React.FC<SubStackScreenProps<ScreenTypes.RESULT>> = observer(
  function Result(_props) {
    const { colors, goHome, solutions, styles } = useResult()
    useRenderCount('ResultScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="fixed"
        safeAreaEdges={['top', 'bottom']}>
        <Card
          style={styles.card}
          LeftComponent={<Text preset="h1" tx="screen.result.points" />}
          RightComponent={
            <CircleDiagram
              maxPoints={solutions?.questions?.length || 0}
              pointsReached={solutions?.score || 0}
            />
          }
        />
        <Button
          tx="common.backToStart"
          preset="primary"
          buttonContainerStyle={styles.button}
          onPress={goHome}
        />
        {solutions?.questions?.length === 0 ? (
          <EmptyState
            preset="fail"
            imageStyle={styles.imgNoContent}
            ImageProps={{ containerStyle: styles.imgNoContentContainer }}
          />
        ) : (
          <ListView
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: string }) => (
              <ListItemSimple
                colors={colors}
                item={item}
                endIcon={item.split(' ').some(word => word.includes('correct')) ? 'check' : 'close'}
              />
            )}
            data={solutions?.questions}
            estimatedItemSize={136}
          />
        )}
      </Screen>
    )
  },
)
