import React from 'react'
import { View } from 'react-native'

import { Screen, Text } from 'app/components'
import { ContentLanguage, translate } from 'app/i18n'
import type { MainTabScreenProps, ScreenTypes } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import Header from './Header'
import SettingArea from './SettingArea'
import useSetting from './useSetting'

const languages = Object.keys(ContentLanguage)

export const SettingScreen: React.FC<MainTabScreenProps<ScreenTypes.SETTING>> = function Setting(
  _props,
) {
  const { appLanguage, appTheme, handleChangeLanguage, handleSetAppTheme, styles } = useSetting()
  useRenderCount('SettingScreen')

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="auto"
      safeAreaEdges={['top', 'bottom']}>
      <Header />
      <View style={styles.content}>
        {/* Theme Setting */}
        <View>
          <Text preset="h3" weight="semiBold" tx="screen.setting.theme" />
          <SettingArea
            preset="switch"
            setting={translate('screen.setting.changeColorMode')!}
            handleClick={handleSetAppTheme}
            active={() => appTheme === 'dark'}
          />
        </View>

        {/* Language Settings */}
        <View>
          <Text preset="h3" weight="semiBold" tx="screen.setting.languages" />
          <SettingArea
            preset="multi"
            active={item => ContentLanguage[item as keyof typeof ContentLanguage] === appLanguage}
            settings={languages}
            handleClick={handleChangeLanguage}
          />
        </View>
      </View>
    </Screen>
  )
}
