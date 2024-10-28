import { TranslateOptions } from 'i18n-js'
import Toast from 'react-native-toast-message'

import { translate, TxKeyPath } from 'app/i18n'

export const showErrorToast = (
  messageHead: TxKeyPath,
  error?: any,
  headOptions?: TranslateOptions,
) => {
  const errorMsg = error && (error?.message || translate('error.unexpected'))
  Toast.show({ text1: translate(messageHead, headOptions)!, text2: errorMsg, type: 'error' })
}

export const showSuccessToast = (
  messageHead: TxKeyPath,
  success?: TxKeyPath,
  headOptions?: TranslateOptions,
  successOptions?: TranslateOptions,
) => {
  Toast.show({
    text1: translate(messageHead, headOptions)!,
    text2: success && translate(success, successOptions)!,
    type: 'success',
  })
}
