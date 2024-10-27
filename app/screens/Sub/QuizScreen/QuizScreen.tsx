import React from 'react'
import { ScrollView, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { Button, Screen, Text, TextField } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useQuiz from './useQuiz'

export const QuizScreen: React.FC<SubStackScreenProps<ScreenTypes.QUIZ>> = observer(function Quiz(
  _props,
) {
  const {
    currentIndex,
    handleFinish,
    handleInputChange,
    handleNext,
    handlePrevious,
    inputRef,
    question,
    questionAmount,
    scrollViewRef,
    styles,
  } = useQuiz()
  useRenderCount('QuizScreen')

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={['top', 'bottom']}>
      <View style={styles.headerContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.progressContainer}>
          {Array(questionAmount)
            .fill('')
            .map((_, index) => (
              <View
                key={index}
                style={[styles.progressDot, currentIndex === index && styles.active]}>
                <Text preset="h2" weight="semiBold">
                  {index + 1}
                </Text>
              </View>
            ))}
        </ScrollView>
        <Text preset="h2" style={styles.question}>
          {question}
        </Text>
      </View>
      <TextField
        ref={inputRef}
        variant="filled"
        placeholderTx="screen.quiz.placeholder"
        labelTx="screen.quiz.label"
        onSubmitEditing={handleNext}
        onChangeText={handleInputChange}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button
          leftIcon="left"
          leftIconLibrary="AntDesign"
          preset="primary"
          buttonContainerStyle={[styles.circleButton, currentIndex === 0 && styles.inactive]}
          onPress={handlePrevious}
        />
        <Button
          tx="common.finish"
          preset="primary"
          buttonContainerStyle={styles.button}
          disabled={currentIndex !== questionAmount - 1}
          disabledTextStyle={styles.disabledText}
          onPress={handleFinish}
        />
        <Button
          leftIcon="right"
          leftIconLibrary="AntDesign"
          preset="primary"
          buttonContainerStyle={[
            styles.circleButton,
            currentIndex === questionAmount - 1 && styles.inactive,
          ]}
          onPress={handleNext}
        />
      </View>
    </Screen>
  )
})
