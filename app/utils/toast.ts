import Toast from 'react-native-toast-message'

import { translate, TxKeyPath } from 'app/i18n'

export const showErrorToast = (messageHead: TxKeyPath, error: any) => {
  const errorMsg = error?.message || translate('error.unexpected')
  Toast.show({ text1: translate(messageHead), text2: errorMsg, type: 'error' })
}

export const showSuccessToast = (messageHead: TxKeyPath, success: TxKeyPath) => {
  Toast.show({
    text1: translate(messageHead),
    text2: translate(success),
    type: 'success',
  })
}
