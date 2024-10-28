import { useRef } from 'react'

import * as yup from 'yup'

import { CustomTextInputRef } from 'app/components/Input/TextField.type'
import { useAppContext } from 'app/context'
import { translate } from 'app/i18n'
import { ScreenTypes } from 'app/navigators'
import { useGoogleLogin } from 'app/utils'

import { loginStyles } from './Login.style'

const useLogin = () => {
  const {
    authenticationStore: { googleLogin, isLoading, login },
    colors,
    navigation,
  } = useAppContext()
  const { google } = useGoogleLogin()

  const passwordRef = useRef<CustomTextInputRef>(null)

  const fieldValidation = yup.object().shape({
    emailOrUsername: yup
      .string()
      .trim() // Remove whitespace from both ends
      .required(translate('validation.emailOrUsername.required')!), // Custom error message for required field

    password: yup
      .string()
      .trim() // Remove whitespace from both ends
      .required(translate('validation.password.required')!) // Custom error message for required field
      .min(8, translate('validation.password.minLength')!) // Minimum length requirement
      .matches(/[a-z]/, translate('validation.password.lowercase')!) // At least one lowercase letter
      .matches(/[A-Z]/, translate('validation.password.uppercase')!) // At least one uppercase letter
      .matches(/[0-9]/, translate('validation.password.number')!) // At least one number
      .matches(/[\W_]/, translate('validation.password.special')!), // At least one special character
  })

  const initialValues = {
    emailOrUsername: '',
    password: '',
  }

  const handleLogin = async (values: typeof initialValues) => {
    const { emailOrUsername, password } = values
    const loginPayload = emailOrUsername.includes('@')
      ? { email: emailOrUsername, password }
      : { password, username: emailOrUsername }

    await login(loginPayload)
  }

  const handleRegister = () => {
    navigation.navigate(ScreenTypes.SIGNUP)
  }

  const handleGoogleLogin = async () => {
    await google(async (accessToken: string) => {
      await googleLogin(accessToken)
    })
  }

  return {
    colors,
    fieldValidation,
    handleGoogleLogin,
    handleLogin,
    handleRegister,
    initialValues,
    isLoading,
    passwordRef,
    styles: loginStyles(colors),
  }
}

export default useLogin
