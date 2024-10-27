import React from 'react'

import { observer } from 'mobx-react-lite'

import { EmptyState, ListItemDetail, ListView, Screen, TextField } from 'app/components'
import type { MainTabScreenProps, ScreenTypes } from 'app/navigators'
import { ThreadResult } from 'app/services'
import { useRenderCount } from 'app/utils'

import useHome from './useHome'

export const HomeScreen: React.FC<MainTabScreenProps<ScreenTypes.HOME>> = observer(function Home(
  _props,
) {
  const {
    colors,
    handleRefetch,
    handleScroll,
    searchFieldRef,
    searchThreads,
    styles,
    threads,
    updateVoting,
  } = useHome()
  useRenderCount('HomeScreen')

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={['top', 'bottom']}>
      <TextField
        ref={searchFieldRef}
        style={styles.input}
        variant="filled"
        leftIcon="search1"
        leftIconLibrary="AntDesign"
        placeholderTx="search.placeholder"
        labelTx="search.label"
        debounceDelay={300}
        onChangeTextDebounce={text => searchThreads(text)}
      />
      {threads?.length === 0 ? (
        <EmptyState
          preset="generic"
          imageStyle={styles.imgNoContent}
          ImageProps={{ containerStyle: styles.imgNoContentContainer }}
          buttonOnPress={handleRefetch}
        />
      ) : (
        <ListView
          contentContainerStyle={styles.list}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: ThreadResult }) => (
            <ListItemDetail colors={colors} item={item} updateVoting={updateVoting} />
          )}
          data={threads}
          estimatedItemSize={136}
          scrollEventThrottle={2000}
        />
      )}
    </Screen>
  )
})
