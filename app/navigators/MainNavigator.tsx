import React from 'react'
import { Animated, Platform, ViewStyle } from 'react-native'

import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Icon, IconProps, LibraryTypes, textPresets } from 'app/components'
import { useAppContext } from 'app/context'
import { translate } from 'app/i18n'
import * as Screens from 'app/screens'
import { sizing } from 'app/theme'
import { isWeb, scaledSize } from 'app/utils'

import { MainTabParamList, ScreenTypes } from './navigation.type'

const Tab = createBottomTabNavigator<MainTabParamList>()

const scaleValues = {
  Add: new Animated.Value(1),
  Home: new Animated.Value(1),
  Network: new Animated.Value(1),
  Search: new Animated.Value(1),
}

const animateTabPress = (scaleValue: Animated.Value) => {
  Animated.sequence([
    Animated.timing(scaleValue, {
      duration: 50,
      toValue: 0.8,
      useNativeDriver: true,
    }),
    Animated.timing(scaleValue, {
      duration: 50,
      toValue: 1,
      useNativeDriver: true,
    }),
  ]).start()
}

interface AnimatedIconProps {
  name: string
  scale: Animated.Value
  focused: boolean
  accent: string
  text: string
}

const AnimatedIcon = <T extends LibraryTypes>({
  accent,
  focused,
  name,
  scale,
  text,
}: AnimatedIconProps) => (
  <Animated.View style={{ transform: [{ scale }] }}>
    <Icon
      icon={(focused ? name : `${name}-outline`) as IconProps<T>['icon']}
      library="Ionicons"
      size={scaledSize(sizing.iconSize.normal)}
      color={focused ? accent : text}
    />
  </Animated.View>
)

export function MainNavigator() {
  const { colors } = useAppContext()
  const { bottom } = useSafeAreaInsets()

  const tabBarStyle: ViewStyle = {
    backgroundColor: colors.background,
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: 10,
    ...Platform.select({
      web: {
        paddingBottom: 0,
      },
    }),
  }

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: colors.accent,
    tabBarHideOnKeyboard: true,
    tabBarInactiveTintColor: colors.text,
    tabBarLabelStyle: textPresets.h5,
    tabBarStyle: [tabBarStyle, { height: bottom + 70 }],
  }

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName={ScreenTypes.HOME}>
      <Tab.Screen
        name={ScreenTypes.HOME}
        component={Screens.HomeScreen}
        options={{
          tabBarIcon: props => (
            <AnimatedIcon {...colors} {...props} name="home" scale={scaleValues.Home} />
          ),
          tabBarLabel: translate('screens.home') as string,
          title: translate('screens.home')!,
        }}
        listeners={{ tabPress: () => animateTabPress(scaleValues.Home) }}
      />
      <Tab.Screen
        name={ScreenTypes.LIBRARY}
        component={Screens.LibraryScreen}
        options={{
          tabBarIcon: props => (
            <AnimatedIcon {...colors} {...props} name="library" scale={scaleValues.Search} />
          ),
          tabBarLabel: translate('screens.library') as string,
          title: translate('screens.library')!,
        }}
        listeners={{ tabPress: () => animateTabPress(scaleValues.Search) }}
      />
      <Tab.Screen
        name={ScreenTypes.SETTING}
        component={Screens.SettingScreen}
        options={{
          tabBarIcon: props => (
            <AnimatedIcon {...colors} {...props} name="settings" scale={scaleValues.Add} />
          ),
          tabBarLabel: translate('screens.setting') as string,
          title: translate('screens.setting')!,
        }}
        listeners={{ tabPress: () => animateTabPress(scaleValues.Add) }}
      />
      {__DEV__ && !isWeb && (
        <Tab.Screen
          name={ScreenTypes.NETWORK_CHECK}
          component={Screens.NetworkLoggerScreen}
          options={{
            tabBarIcon: props => (
              <AnimatedIcon {...colors} {...props} name="key" scale={scaleValues.Network} />
            ),
            tabBarLabel: translate('screens.networkCheck') as string,
            title: translate('screens.networkCheck')!,
          }}
          listeners={{ tabPress: () => animateTabPress(scaleValues.Network) }}
        />
      )}
    </Tab.Navigator>
  )
}
