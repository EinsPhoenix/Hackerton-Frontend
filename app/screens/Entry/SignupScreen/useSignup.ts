import { useRef } from 'react'
import { TextInput } from 'react-native'

import * as yup from 'yup'

import { useAppContext } from 'app/context'
import { translate } from 'app/i18n'
import { ScreenTypes } from 'app/navigators'
import { useGoogleLogin } from 'app/utils'

import { signupStyles } from './Signup.style'

const useSignup = () => {
  const {
    authenticationStore: { googleLogin, isLoading, signup },
    colors,
    navigation,
  } = useAppContext()
  const { google } = useGoogleLogin()

  const inputRef = useRef<{
    email: TextInput | null
    password: TextInput | null
    passwordRepeat: TextInput | null
  }>({
    email: null,
    password: null,
    passwordRepeat: null,
  })

  const fieldValidation = yup.object().shape({
    // Custom error message for required field
    email: yup
      .string()
      .trim() // Remove whitespace from both ends
      .email(translate('validation.email.pattern')!) // Validate email format
      .required(translate('validation.email.required')!),

    // Custom error message for required field
    password: yup
      .string()
      .trim() // Remove whitespace from both ends
      .required(translate('validation.password.required')!) // Custom error message for required field
      .min(8, translate('validation.password.minLength')!) // Minimum length requirement
      .matches(/[a-z]/, translate('validation.password.lowercase')!) // At least one lowercase letter
      .matches(/[A-Z]/, translate('validation.password.uppercase')!) // At least one uppercase letter
      .matches(/[0-9]/, translate('validation.password.number')!) // At least one number
      .matches(/[\W_]/, translate('validation.password.special')!), // At least one special character

    // At least one special character
    passwordRepeat: yup
      .string()
      .trim() // Remove whitespace from both ends
      .required(translate('validation.password.required')!) // Custom error message for required field
      .min(8, translate('validation.password.minLength')!) // Minimum length requirement
      .matches(/[a-z]/, translate('validation.password.lowercase')!) // At least one lowercase letter
      .matches(/[A-Z]/, translate('validation.password.uppercase')!) // At least one uppercase letter
      .matches(/[0-9]/, translate('validation.password.number')!) // At least one number
      .matches(/[\W_]/, translate('validation.password.special')!) // At least one special character
      .oneOf([yup.ref('password')], translate('validation.password.match')!), // Ensure password and passwordRepeat are the same

    username: yup
      .string()
      .trim() // Remove whitespace from both ends
      .transform(value => value.toLowerCase()) // Convert to lowercase
      .matches(/^[a-z0-9._-]+$/, translate('validation.username.invalidChars')!) // Only allow lowercase, numbers, ., -, _
      .required(translate('validation.username.required')!),
  })

  const initialValues = {
    email: '',
    password: '',
    passwordRepeat: '',
    username: '',
  }

  const handleSignup = async (values: typeof initialValues) => {
    await signup(values)
  }

  const handleLogin = () => {
    navigation.navigate(ScreenTypes.LOGIN)
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
    handleSignup,
    initialValues,
    inputRef,
    isLoading,
    styles: signupStyles(colors),
  }
}

export default useSignup
