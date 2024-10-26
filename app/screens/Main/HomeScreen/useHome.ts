import { useEffect, useRef } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

import { CustomTextInputRef } from 'app/components/Input/TextField.type'
import { useAppContext } from 'app/context'
import { TxKeyPath } from 'app/i18n'
import { ScreenTypes } from 'app/navigators'
import { useHeader } from 'app/utils'

import { homeStyles } from './Home.style'

const useHome = () => {
  const {
    authenticationStore: { jwtClaims },
    colors,
    navigation,
    threadStore: { getThreads, isLoading, searchThreads, setLoading, threads, updateVoting },
  } = useAppContext()

  const searchFieldRef = useRef<CustomTextInputRef | null>(null)

  function goProfile() {
    navigation.navigate(ScreenTypes.SUB, { screen: ScreenTypes.PROFILE })
  }

  function handleRefetch() {
    searchFieldRef.current?.reset()
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
      loading: isLoading,
      onRightPress: goProfile,
      rightIcon: 'user',
      rightIconLibrary: 'AntDesign',
    },
    [goProfile],
  )

  useEffect(() => {
    getThreads().then()
  }, [getThreads])

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentHeight = event.nativeEvent.contentSize.height
    const scrollHeight = event.nativeEvent.layoutMeasurement.height
    const scrollY = event.nativeEvent.contentOffset.y

    if (scrollY + scrollHeight >= contentHeight / 2) {
      getThreads(true).then()
    }
  }

  return {
    colors,
    handleRefetch,
    handleScroll,
    searchFieldRef,
    searchThreads,
    styles: homeStyles(colors),
    threads,
    updateVoting,
  }
}

export default useHome
