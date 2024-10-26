import * as Linking from 'expo-linking'

import { translate } from 'app/i18n'
import { ScreenTypes } from 'app/navigators/navigation.type'

// Web linking configuration
const prefix = Linking.createURL('/')
const config = {
  screens: {
    [ScreenTypes.MAIN]: {
      screens: {
        [ScreenTypes.HOME]: translate('screens.home'),
        [ScreenTypes.LIBRARY]: translate('screens.library'),
        [ScreenTypes.SETTING]: translate('screens.setting'),
        [ScreenTypes.NETWORK_CHECK]: translate('screens.networkCheck'),
      },
    },
    [ScreenTypes.SUB]: {
      screens: {
        [ScreenTypes.PROFILE]: translate('screens.profile'),
        [ScreenTypes.ADD]: translate('screens.add'),
      },
    },
    [ScreenTypes.LOGIN]: {
      path: '',
    },
    [ScreenTypes.SIGNUP]: translate('screens.signup'),
    [ScreenTypes.WELCOME]: translate('screens.welcome'),
  },
}

export const linking = {
  config,
  prefixes: [prefix],
}
