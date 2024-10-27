import { useStores } from 'app/models'
import { AppNavigationProp, useWithNavigation, WithNavigation } from 'app/navigators'
import { appServices, pickImage, takePhoto } from 'app/services'

import { useLanguage } from './LocalizationContext'
import { useColor } from './ThemeContext'

export const useAppContextOnly = () => {
  const color = useColor()
  const language = useLanguage()
  const stores = useStores()

  return {
    ...stores,
    ...color,
    ...language,
    pickImage,
    services: appServices,
    takePhoto,
  }
}

export type AppContextType = ReturnType<typeof useAppContextOnly>

export const useAppContext = (): WithNavigation<AppNavigationProp, AppContextType> => {
  return useWithNavigation<AppNavigationProp, AppContextType>(useAppContextOnly())
}
