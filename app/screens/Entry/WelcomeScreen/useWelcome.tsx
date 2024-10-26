import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { Text } from 'app/components'
import { useAppContext } from 'app/context'
import { Preference } from 'app/services'
import { sizing } from 'app/theme'
import { useHeader } from 'app/utils'

import { PREFERENCES } from './PreferencesList'
import { welcomeStyles } from './Welcome.style'

const useWelcome = () => {
  const {
    authenticationStore: { isLoading, logout, postPreferences },
    colors,
  } = useAppContext()
  const [prefs, setPrefs] = useState<Preference[]>(PREFERENCES)

  async function goNext() {
    await postPreferences({ prefs })
  }

  useHeader(
    {
      RightActionComponent: (
        <TouchableOpacity onPress={logout}>
          <Text
            preset="h5"
            tx="auth.logout"
            color={colors.accent}
            style={{ paddingHorizontal: sizing.spacing.md }}
          />
        </TouchableOpacity>
      ),
    },
    [logout],
  )

  return {
    goNext,
    isLoading,
    prefs,
    setPrefs,
    styles: welcomeStyles(colors),
  }
}

export default useWelcome
