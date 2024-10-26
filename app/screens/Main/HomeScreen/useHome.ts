import { useEffect } from 'react'

import { useAppContext } from 'app/context'
import { TxKeyPath } from 'app/i18n'
import { ScreenTypes } from 'app/navigators'
import { logger, useHeader } from 'app/utils'

import { homeStyles } from './Home.style'

const useHome = () => {
  const {
    authenticationStore: { jwtClaims, logout },
    colors,
    navigation,
    threadStore: { getThreads, isLoading, threads },
  } = useAppContext()

  function goProfile() {
    navigation.navigate(ScreenTypes.SUB, { screen: ScreenTypes.PROFILE })
  }

  function handleRefetch() {
    getThreads().then(response => logger.log(response))
  }

  function getGreetingTime(): TxKeyPath {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
      return 'greeting.morning' // Morning greeting
    } else if (currentHour < 18) {
      return 'greeting.afternoon' // Afternoon greeting
    } else {
      return 'greeting.evening' // Evening greeting
    }
  }

  const greetingKey = getGreetingTime()

  useHeader(
    {
      leftTextSub: jwtClaims?.username,
      leftTx: greetingKey,
      onRightPress: logout,
      rightIcon: 'user',
      rightIconLibrary: 'AntDesign',
    },
    [logout],
  )

  useEffect(() => {
    getThreads().then(response => logger.log(response))
  }, [getThreads])

  return {
    colors,
    getThreads,
    handleRefetch,
    isLoading,
    styles: homeStyles(colors),
    threads,
  }
}

export default useHome
