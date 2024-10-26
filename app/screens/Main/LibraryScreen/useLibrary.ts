import { useEffect } from 'react'

import { useAppContext } from 'app/context'
import { ScreenTypes } from 'app/navigators'
import { logger, useHeader } from 'app/utils'

import { libraryStyles } from './Library.style'

const useLibrary = () => {
  const {
    colors,
    libraryStore: { getUserRelatedData, isLoading, userData },
    navigation,
  } = useAppContext()

  const goAddThread = () => {
    navigation.navigate(ScreenTypes.SUB, { screen: ScreenTypes.ADD })
  }

  useHeader(
    {
      leftTx: 'screens.library',
      onRightPress: goAddThread,
      rightIcon: 'add',
      rightIconLibrary: 'Ionicons',
    },
    [goAddThread],
  )

  useEffect(() => {
    getUserRelatedData().then(result => logger.log(result))
  }, [getUserRelatedData])

  return {
    isLoading,
    styles: libraryStyles(colors),
    userData,
  }
}

export default useLibrary
