import { useEffect } from 'react'

import { useRoute } from '@react-navigation/native'

import { useAppContext } from 'app/context'
import { RouteProps, ScreenTypes } from 'app/navigators'
import { useHeader } from 'app/utils'

import { quizGenerationStyles } from './QuizGeneration.style'

const useQuizGeneration = () => {
  const {
    colors,
    language,
    navigation,
    quizStore: { generateQuiz, isLoading, quiz },
  } = useAppContext()
  const {
    params: { item: data },
  } = useRoute<RouteProps<ScreenTypes.QUIZ_GENERATION>>()
  const styles = quizGenerationStyles(colors)

  const goBack = () => {
    if (navigation.canGoBack()) return navigation.goBack()

    navigation.navigate(ScreenTypes.SUB, { params: {}, screen: ScreenTypes.THREAD })
  }

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      loading: isLoading,
      onLeftPress: goBack,
      titleMode: 'center',
      titleTx: 'screen.quiz.overview',
    },
    [goBack, isLoading],
  )

  const handleRefetch = () => {
    if (data?.id_thread) {
      generateQuiz({ id_thread: data.id_thread, language_code: language }).then()
    }
  }

  const handleStartQuiz = () => {
    navigation.navigate(ScreenTypes.SUB, {
      params: { item: data },
      screen: ScreenTypes.QUIZ,
    })
  }

  useEffect(() => {
    handleRefetch()
  }, [])

  return {
    colors,
    data,
    handleRefetch,
    handleStartQuiz,
    quiz,
    styles,
  }
}

export default useQuizGeneration
