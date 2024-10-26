import React from 'react'

import NetworkLogger, { ThemeName } from 'react-native-network-logger'

import { Screen } from 'app/components'
import { useAppContext } from 'app/context'
import type { MainTabScreenProps, ScreenTypes } from 'app/navigators'

export const NetworkLoggerScreen: React.FC<MainTabScreenProps<ScreenTypes.NETWORK_CHECK>> =
  function NetworkLoggerDebug() {
    const { appTheme } = useAppContext()

    return (
      <Screen preset="auto" safeAreaEdges={['top', 'bottom']}>
        <NetworkLogger theme={appTheme as ThemeName} />
      </Screen>
    )
  }
