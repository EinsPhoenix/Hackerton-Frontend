import React, { useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'

import { Text } from 'app/components'
import { useAppContext } from 'app/context'
import { translate } from 'app/i18n'
import { ScreenTypes } from 'app/navigators'
import { sizing } from 'app/theme'
import { isWeb, useHeader } from 'app/utils'

import { profileStyles } from './Profile.style'

const useHome = () => {
  const {
    authenticationStore: {
      deleteAccount,
      getPreferences,
      image,
      isLoading,
      jwtClaims,
      logout,
      setImage,
      weightedPreferences,
    },
    colors,
    libraryStore: { getUserRelatedData, userData },
    navigation,
    pickImage,
  } = useAppContext()

  const goBack = () => {
    navigation.navigate(ScreenTypes.MAIN, { screen: ScreenTypes.HOME })
  }

  const handleChangeImage = async () => {
    const uri = await pickImage()
    await setImage(uri)
  }

  const handleDelete = async () => {
    if (isWeb) {
      const password = window.prompt(translate('common.deleteAskAgain')!)
      if (password) {
        await deleteAccount()
      }
      return
    }

    Alert.alert(
      translate('common.deleteAcc')!,
      translate('common.deleteAskAgain')!,
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: deleteAccount,
          style: 'destructive',
          text: 'Delete',
        },
      ],
      { cancelable: true },
    )
  }

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      loading: isLoading,
      onLeftPress: goBack,
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
    [logout, goBack],
  )

  useEffect(() => {
    getUserRelatedData().then(() => getPreferences())
  }, [])

  return {
    colors,
    handleChangeImage,
    handleDelete,
    image,
    jwtClaims,
    styles: profileStyles(colors),
    userData,
    weightedPreferences,
  }
}

export default useHome
