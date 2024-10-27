import React from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { EmptyState, ListItemDetail, ListView, Screen, Text } from 'app/components'
import type { MainTabScreenProps, ScreenTypes } from 'app/navigators'
import { ThreadResult } from 'app/services'
import { useRenderCount } from 'app/utils'

import ImportantInfo from './ImportantInfo'
import useLibrary from './useLibrary'

export const LibraryScreen: React.FC<MainTabScreenProps<ScreenTypes.LIBRARY>> = observer(
  function Library(_props) {
    const { colors, styles, userData } = useLibrary()
    useRenderCount('LibraryScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="auto"
        safeAreaEdges={['top', 'bottom']}>
        <View>
          {userData?.importantInfo && (
            <Text preset="h2" weight="light" color={colors.accent} tx="common.important" />
          )}
          {userData?.importantInfo?.length === 0 ? (
            <EmptyState preset="library" />
          ) : (
            <ImportantInfo colors={colors} importantInfo={userData?.importantInfo} />
          )}
        </View>

        <View>
          {userData?.written_threads && (
            <Text preset="h2" weight="light" color={colors.accent} tx="threads.own" />
          )}
          {userData?.written_threads?.length === 0 ? (
            <EmptyState preset="library" />
          ) : (
            <ListView
              style={styles.list}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: { item: ThreadResult }) => (
                <ListItemDetail colors={colors} item={item} disableSwipe={true} />
              )}
              data={userData?.written_threads}
              estimatedItemSize={136}
              scrollEventThrottle={2000}
            />
          )}
        </View>

        <View>
          {userData?.upvoted_threads && (
            <Text preset="h2" weight="light" color={colors.accent} tx="threads.upvoted" />
          )}
          {userData?.upvoted_threads?.length === 0 ? (
            <EmptyState preset="library" />
          ) : (
            <ListView
              style={styles.list}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: { item: ThreadResult }) => (
                <ListItemDetail colors={colors} item={item} disableSwipe={true} />
              )}
              data={userData?.upvoted_threads}
              estimatedItemSize={136}
              scrollEventThrottle={2000}
            />
          )}
        </View>

        <View>
          {userData?.downvoted_threads && (
            <Text preset="h2" weight="light" color={colors.accent} tx="threads.downvoted" />
          )}
          {userData?.downvoted_threads?.length === 0 ? (
            <EmptyState preset="library" />
          ) : (
            <ListView
              style={styles.list}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: { item: ThreadResult }) => (
                <ListItemDetail colors={colors} item={item} disableSwipe={true} />
              )}
              data={userData?.downvoted_threads}
              estimatedItemSize={136}
              scrollEventThrottle={2000}
            />
          )}
        </View>
      </Screen>
    )
  },
)
