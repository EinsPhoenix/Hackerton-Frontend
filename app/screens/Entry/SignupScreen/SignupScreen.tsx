import React from 'react'
import { View, ViewStyle } from 'react-native'

import { Images } from 'assets/images'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'

import { Button, Field, Image, LoadingAnimation, Screen, Text } from 'app/components'
import type { AppStackScreenProps, ScreenTypes } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useSignup from './useSignup'

interface SpacerProps {
  barStyle: ViewStyle
  containerStyle: ViewStyle
  textColor: string
}

const Spacer: React.FC<SpacerProps> = ({ barStyle, containerStyle, textColor }) => {
  return (
    <View style={containerStyle}>
      <View style={barStyle} />
      <Text preset="small" tx="auth.or" color={textColor} />
      <View style={barStyle} />
    </View>
  )
}

export const SignupScreen: React.FC<AppStackScreenProps<ScreenTypes.SIGNUP>> = observer(
  function Login(_props) {
    const {
      colors,
      fieldValidation,
      handleGoogleLogin,
      handleLogin,
      handleSignup,
      initialValues,
      inputRef,
      isLoading,
      styles,
    } = useSignup()
    useRenderCount('SignupScreen')

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="auto"
        safeAreaEdges={['top', 'bottom']}>
        <LoadingAnimation loading={isLoading} />
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={Images.APP_IMAGE}
              containerStyle={styles.imgContainer}
              style={styles.img}
            />
            <View style={styles.headerText}>
              <Text preset="h2" tx="auth.register" color={colors.accent} />
              <Text preset="h3" tx="auth.welcomeNew" weight="light" />
            </View>
          </View>

          <Formik
            style={styles.input}
            initialValues={initialValues}
            validationSchema={fieldValidation}
            onSubmit={handleSignup}>
            {({ submitForm }) => (
              <View style={styles.content}>
                <Field
                  style={styles.input}
                  variant="filled"
                  name="username"
                  placeholderTx="auth.placeholder.username"
                  labelTx="auth.label.username"
                  onSubmitEditing={() => {
                    inputRef.current.email?.focus()
                  }}
                />
                <Field
                  ref={input => (inputRef.current.email = input)}
                  style={styles.input}
                  variant="filled"
                  name="email"
                  placeholderTx="auth.placeholder.email"
                  labelTx="auth.label.email"
                  onSubmitEditing={() => {
                    inputRef.current.password?.focus()
                  }}
                />
                <Field
                  ref={input => (inputRef.current.password = input)}
                  style={styles.input}
                  variant="filled"
                  name="password"
                  secureTextEntry
                  placeholderTx="auth.placeholder.password"
                  labelTx="auth.label.password"
                  onSubmitEditing={() => {
                    inputRef.current.passwordRepeat?.focus()
                  }}
                />
                <Field
                  ref={input => (inputRef.current.passwordRepeat = input)}
                  style={styles.input}
                  variant="filled"
                  name="passwordRepeat"
                  secureTextEntry
                  placeholderTx="auth.placeholder.passwordRepeat"
                  labelTx="auth.label.passwordRepeat"
                  onSubmitEditing={submitForm}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={submitForm}
                    preset="primary"
                    tx="auth.register"
                    buttonContainerStyle={styles.button}
                  />
                  <Spacer
                    barStyle={styles.barStyle}
                    containerStyle={styles.spacerContainer}
                    textColor={colors.textDim}
                  />
                  <Button
                    onPress={handleGoogleLogin}
                    leftNoColorChange
                    preset="tertiary"
                    tx="auth.google"
                    buttonContainerStyle={styles.button}
                    leftIcon="GOOGLE"
                  />
                </View>
              </View>
            )}
          </Formik>

          <View style={styles.footer}>
            <Text preset="h5" tx="auth.alreadyAccount" />
            <Text
              preset="h5"
              tx="auth.loginHere"
              weight="bold"
              style={styles.login}
              onPress={handleLogin}
            />
          </View>
        </View>
      </Screen>
    )
  },
)
