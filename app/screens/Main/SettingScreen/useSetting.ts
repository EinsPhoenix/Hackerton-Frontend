import { useCallback } from 'react'

import { useAppContext } from 'app/context'
import { ContentLanguage } from 'app/i18n'
import { useHeader } from 'app/utils'

import { settingStyles } from './Setting.style'

const useSetting = () => {
  const {
    appTheme,
    colors,
    language: appLanguage,
    setAppTheme: handleSetAppTheme,
    setLanguageInApp,
  } = useAppContext()

  useHeader(
    {
      leftTx: 'screens.setting',
    },
    [],
  )

  const handleChangeLanguage = useCallback(
    (m?: string) => () => {
      setLanguageInApp(ContentLanguage[m! as keyof typeof ContentLanguage])
    },
    [setLanguageInApp],
  )

  return {
    appLanguage,
    appTheme,
    handleChangeLanguage,
    handleSetAppTheme,
    styles: settingStyles(colors),
  }
}

export default useSetting
