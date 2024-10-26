import React from 'react'

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'

import { translate } from 'app/i18n'
import { ScreenTypes, SubStackParamList } from 'app/navigators/navigation.type'
import * as Screens from 'app/screens'

const Stack = createNativeStackNavigator<SubStackParamList>()

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
}

export function SubNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={ScreenTypes.PROFILE}
        component={Screens.ProfileScreen}
        options={{ title: translate('screens.profile') }}
      />
      <Stack.Screen
        name={ScreenTypes.ADD}
        component={Screens.AddScreen}
        options={{ title: translate('screens.add') }}
      />
      <Stack.Screen
        name={ScreenTypes.THREAD}
        component={Screens.ThreadScreen}
        options={{ title: translate('screens.thread') }}
      />
    </Stack.Navigator>
  )
}
