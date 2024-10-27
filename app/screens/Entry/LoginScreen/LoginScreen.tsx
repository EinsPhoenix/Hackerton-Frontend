import React from 'react'
import { View, ViewStyle } from 'react-native'

import { Images } from 'assets/images'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'

import { Button, Field, Image, LoadingAnimation, Screen, Text } from 'app/components'
import type { AppStackScreenProps, ScreenTypes } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useLogin from './useLogin'

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

export const LoginScreen: React.FC<AppStackScreenProps<ScreenTypes.LOGIN>> = observer(
  function Login(_props) {
    const {
      colors,
      fieldValidation,
      handleGoogleLogin,
      handleLogin,
      handleRegister,
      initialValues,
      isLoading,
      passwordRef,
      styles,
    } = useLogin()
    useRenderCount('LoginScreen')

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
              <Text preset="h2" tx="auth.login" color={colors.accent} />
              <Text preset="h3" tx="auth.welcome" weight="light" />
            </View>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={fieldValidation}
            onSubmit={handleLogin}>
            {({ submitForm }) => (
              <View style={styles.content}>
                <Field
                  style={styles.input}
                  variant="filled"
                  name="emailOrUsername"
                  placeholderTx="auth.placeholder.emailOrUsername"
                  labelTx="auth.label.emailOrUsername"
                  onSubmitEditing={() => {
                    passwordRef.current?.focus()
                  }}
                />
                <Field
                  ref={passwordRef}
                  variant="filled"
                  name="password"
                  secureTextEntry
                  placeholderTx="auth.placeholder.password"
                  labelTx="auth.label.password"
                  onSubmitEditing={submitForm}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={submitForm}
                    preset="primary"
                    tx="auth.login"
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
            <Text preset="h5" tx="auth.noAccount" />
            <Text
              preset="h5"
              tx="auth.registerHere"
              weight="bold"
              style={styles.register}
              onPress={handleRegister}
            />
          </View>
        </View>
      </Screen>
    )
  },
)
