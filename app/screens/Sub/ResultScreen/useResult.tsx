import { useRoute } from '@react-navigation/native'

import { useAppContext } from 'app/context'
import { RouteProps, ScreenTypes } from 'app/navigators'
import { useHeader } from 'app/utils'

import { resultStyles } from './Result.style'

const useResult = () => {
  const {
    colors,
    navigation,
    quizStore: { isLoading, solutions },
  } = useAppContext()
  const {
    params: { item: data },
  } = useRoute<RouteProps<ScreenTypes.RESULT>>()

  useHeader(
    {
      leftText: data?.titel,
      leftTxSub: 'screens.result',
      loading: isLoading,
    },
    [isLoading],
  )

  const goHome = () => {
    navigation.navigate(ScreenTypes.MAIN, { screen: ScreenTypes.HOME })
  }

  return {
    colors,
    goHome,
    solutions,
    styles: resultStyles(colors),
  }
}

export default useResult
