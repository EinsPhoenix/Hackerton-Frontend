import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

import { ThreadResult } from 'app/services'

export enum ScreenTypes {
  FORCE_UPDATE_SCREEN = 'forceUpdateScreen',
  NETWORK_CHECK = 'networkCheck',
  WELCOME = 'welcome',
  SETTING = 'setting',
  LOGIN = 'login',
  SIGNUP = 'signup',
  HOME = 'home',
  MAIN = 'main',
  LIBRARY = 'library',
  PROFILE = 'profile',
  SUB = 'sub',
  ADD = 'add',
  THREAD = 'thread',
}

// Sub NAVIGATOR
export type SubStackParamList = {
  [ScreenTypes.PROFILE]: undefined
  [ScreenTypes.ADD]: undefined
  [ScreenTypes.THREAD]: ThreadParams
}

export type SubStackScreenProps<T extends keyof SubStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SubStackParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type ThreadParams = {
  item: ThreadResult
}

// MAIN NAVIGATOR
export type MainTabParamList = {
  [ScreenTypes.HOME]: undefined
  [ScreenTypes.LIBRARY]: undefined
  [ScreenTypes.SETTING]: undefined
  [ScreenTypes.NETWORK_CHECK]: undefined
}

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

// APP NAVIGATOR
export type AppStackParamList = {
  [ScreenTypes.FORCE_UPDATE_SCREEN]: undefined
  [ScreenTypes.WELCOME]: undefined
  [ScreenTypes.LOGIN]: undefined
  [ScreenTypes.SIGNUP]: undefined
  [ScreenTypes.MAIN]: NavigatorScreenParams<MainTabParamList>
  [ScreenTypes.SUB]: NavigatorScreenParams<SubStackParamList>
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList & MainTabParamList>

export type RouteProps<T extends keyof AppStackParamList | keyof MainTabParamList> = RouteProp<
  AppStackParamList & MainTabParamList,
  T
>
