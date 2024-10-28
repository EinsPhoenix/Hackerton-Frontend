import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import Toast from 'react-native-toast-message'

import Config from 'app/config'
import { translate } from 'app/i18n'
import { logger } from 'app/utils'

WebBrowser.maybeCompleteAuthSession()

const config = {
  androidClientId: Config.ANDROID_CLIENT_ID,
  iosClientId: Config.IOS_CLIENT_ID,
  webClientId: Config.WEB_CLIENT_ID,
}

export const useGoogleLogin = () => {
  const [_request, _response, promptAsync] = Google.useAuthRequest(config)

  const google = async (callback: (accessToken: string) => void) => {
    const result = await promptAsync()

    if (result.type === 'success' && result.authentication) {
      logger.log(result)
      callback(result.authentication.accessToken)
    } else if (result.type === 'error') {
      Toast.show({ text1: translate('error.login')!, text2: result.error?.message, type: 'error' })
    }
  }

  return { google }
}
