import { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'

import { useRoute } from '@react-navigation/native'

import { CustomTextInputRef } from 'app/components/Input/TextField.type'
import { useAppContext } from 'app/context'
import { RouteProps, ScreenTypes } from 'app/navigators'
import { logger, useHeader } from 'app/utils'

import { quizStyles } from './Quiz.style'

const useQuiz = () => {
  const {
    colors,
    language,
    navigation,
    quizStore: { postAnswers, quiz },
  } = useAppContext()
  const {
    params: { item: data },
  } = useRoute<RouteProps<ScreenTypes.QUIZ>>()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>(() => {
    return quiz?.questions ? Array(quiz.questions.length).fill('not answered') : []
  })
  const scrollViewRef = useRef<ScrollView>(null)
  const inputRef = useRef<CustomTextInputRef>(null)

  useHeader({
    leftText: data?.titel,
    leftTxSub: 'screens.quiz',
  })

  const handleFinish = () => {
    if (!data?.id_thread) return
    logger.log('Submitted answers:', answers)

    return Promise.all([
      postAnswers({ answers, id_thread: data.id_thread, language_code: language }),
      navigation.navigate(ScreenTypes.SUB, { params: { item: data }, screen: ScreenTypes.RESULT }),
    ])
  }

  const handleNext = () => {
    if (quiz?.questions && currentIndex < quiz?.questions.length - 1) {
      inputRef.current?.setInput(
        answers[currentIndex + 1] === 'not answered' ? '' : answers[currentIndex + 1],
      )
      setCurrentIndex(prevIndex => prevIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      inputRef.current?.setInput(
        answers[currentIndex - 1] === 'not answered' ? '' : answers[currentIndex - 1],
      )
      setCurrentIndex(prevIndex => prevIndex - 1)
    }
  }

  const handleInputChange = (text: string) => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentIndex] = text
    setAnswers(updatedAnswers)
  }

  // Scroll to the active item when currentIndex changes
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        // Adjust the multiplier based on the width of each progress dot
        animated: true,
        x: currentIndex * 50,
      })
    }
  }, [currentIndex])

  return {
    currentAnswer: answers[currentIndex] || '',
    currentIndex,
    handleFinish,
    handleInputChange,
    handleNext,
    handlePrevious,
    inputRef,
    question: quiz?.questions ? quiz?.questions[currentIndex] : '',
    questionAmount: quiz?.questions?.length || 0,
    scrollViewRef,
    styles: quizStyles(colors),
  }
}

export default useQuiz
