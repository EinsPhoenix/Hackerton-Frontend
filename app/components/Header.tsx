import React, { ReactElement } from 'react'
import {
  Platform,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native'

import { useAppContext, useColor } from 'app/context'
import { ExtendedEdge, scaledSize, useSafeAreaInsetsStyle } from 'app/utils'

import { isRTL, translate } from '../i18n'
import { sizing } from '../theme'
import { Icon, IconProps, LibraryTypes } from './Icon'
import { Text, TextProps } from './Text'

export interface HeaderProps<L extends LibraryTypes, R extends LibraryTypes> {
  /**
   * The layout of the title relative to the action components.
   * - `center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
   * - `flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.
   */
  titleMode?: 'center' | 'flex'
  /**
   * Optional title style override.
   */
  titleStyle?: StyleProp<TextStyle>
  /**
   * Optional outer title container style override.
   */
  titleContainerStyle?: StyleProp<ViewStyle>
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Optional outer header container style override.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: TextProps['text']
  /**
   * Title text which is looked up via i18n.
   */
  titleTx?: TextProps['tx']
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  titleTxOptions?: TextProps['txOptions']
  /**
   * Icon that should appear on the left.
   * Can be used with `onLeftPress`.
   */
  leftIcon?: IconProps<L>['icon']
  /**
   * IconLibrary for the icon.
   */
  leftIconLibrary?: L
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string
  leftIconSize?: number
  /**
   * Left action text to display if not using `leftTx`.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftText?: TextProps['text']
  /**
   * Left action text text which is looked up via i18n.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftTx?: TextProps['tx']
  /**
   * Left action custom ReactElement if the built in action props don't suffice.
   * Overrides `leftIcon`, `leftTx` and `leftText`.
   */
  LeftActionComponent?: ReactElement
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  leftTxOptions?: TextProps['txOptions']
  /**
   * Left action text to display if not using `leftSubTx`.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftTextSub?: TextProps['text']
  /**
   * Left action text text which is looked up via i18n.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftTxSub?: TextProps['tx']
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  leftTxOptionsSub?: TextProps['txOptions']
  /**
   * What happens when you press the left icon or text action.
   */
  onLeftPress?: TouchableOpacityProps['onPress']
  /**
   * Icon that should appear on the right.
   * Can be used with `onRightPress`.
   */
  rightIcon?: IconProps<R>['icon']
  /**
   * IconLibrary for the icon.
   */
  rightIconLibrary?: R
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string
  rightIconSize?: number
  /**
   * Right action text to display if not using `rightTx`.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightText?: TextProps['text']
  /**
   * Right action text text which is looked up via i18n.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightTx?: TextProps['tx']
  /**
   * Right action custom ReactElement if the built in action props don't suffice.
   * Overrides `rightIcon`, `rightTx` and `rightText`.
   */
  RightActionComponent?: ReactElement
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  rightTxOptions?: TextProps['txOptions']
  /**
   * Right action text to display if not using `rightTxSub`.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightTextSub?: TextProps['text']
  /**
   * Right action text text which is looked up via i18n.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightTxSub?: TextProps['tx']
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  rightTxOptionsSub?: TextProps['txOptions']
  /**
   * What happens when you press the right icon or text action.
   */
  onRightPress?: TouchableOpacityProps['onPress']
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * Children of Header.
   */
  children?: React.ReactNode
}

interface HeaderActionProps<T extends LibraryTypes> {
  backgroundColor?: string
  icon?: IconProps<T>['icon']
  iconLibrary?: T
  iconColor?: string
  text?: TextProps['text']
  tx?: TextProps['tx']
  txOptions?: TextProps['txOptions']
  textSub?: TextProps['text']
  txSub?: TextProps['tx']
  txOptionsSub?: TextProps['txOptions']
  onPress?: TouchableOpacityProps['onPress']
  ActionComponent?: ReactElement
  size?: number
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header is meant to be used with the `screenOptions.header` option on navigators, routes, or screen components via `navigation.setOptions({ header })`.
 * @param {HeaderProps} props - The props for the `Header` component.
 * @returns {React.ReactNode} The rendered `Header` component.
 */
function HeaderComponent(props: HeaderProps<LibraryTypes, LibraryTypes>): React.ReactNode {
  const {
    backgroundColor,
    children,
    containerStyle: containerStyleOverride,
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    leftIconLibrary,
    leftIconSize,
    leftText,
    leftTextSub,
    leftTx,
    leftTxOptions,
    leftTxOptionsSub,
    leftTxSub,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightIconLibrary,
    rightIconSize,
    rightText,
    rightTextSub,
    rightTx,
    rightTxOptions,
    rightTxOptionsSub,
    rightTxSub,
    safeAreaEdges = ['top'],
    style: styleOverride,
    title,
    titleContainerStyle: titleContainerStyleOverride,
    titleMode = 'center',
    titleStyle: titleStyleOverride,
    titleTx,
    titleTxOptions,
  } = props

  const { colors } = useAppContext()

  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  const i18nTitle = titleTx && translate(titleTx, titleTxOptions)
  const titleContent = (i18nTitle || title || children) as string

  const isBoth =
    ((leftTx || leftText) && (leftTxSub || leftTextSub)) ||
    ((rightTx || rightText) && (rightTxSub || rightTextSub))

  const containerStyle = [
    container,
    isBoth ? maxHeight : titleContent ? { height: 70 } : {},
    {
      ...Platform.select({
        web: maxHeight,
      }),
    },
    containerInsets,
    { backgroundColor: backgroundColor || colors.background },
    containerStyleOverride,
  ]

  return (
    <View style={containerStyle}>
      <View style={[wrapper, styleOverride]}>
        <HeaderAction
          tx={leftTx}
          txSub={leftTxSub}
          size={leftIconSize}
          text={leftText}
          textSub={leftTextSub}
          icon={leftIcon}
          iconColor={leftIconColor}
          iconLibrary={leftIconLibrary}
          onPress={onLeftPress}
          txOptions={leftTxOptions}
          txOptionsSub={leftTxOptionsSub}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />

        {!!titleContent && (
          <View
            style={[
              titleMode === 'center' && titleWrapperCenter,
              titleMode === 'flex' && titleWrapperFlex,
              titleContainerStyleOverride,
            ]}
            pointerEvents="none">
            <Text
              weight="medium"
              size="md"
              text={titleContent}
              style={[titleStyle, titleStyleOverride]}
            />
          </View>
        )}

        <HeaderAction
          size={rightIconSize}
          tx={rightTx}
          txSub={rightTxSub}
          text={rightText}
          textSub={rightTextSub}
          icon={rightIcon}
          iconLibrary={rightIconLibrary}
          iconColor={rightIconColor}
          onPress={onRightPress}
          txOptions={rightTxOptions}
          txOptionsSub={rightTxOptionsSub}
          backgroundColor={backgroundColor || colors.background}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  )
}

const MemorizedHeader = React.memo(HeaderComponent)
MemorizedHeader.displayName = 'Header'
export { MemorizedHeader as Header }

/**
 * @param {HeaderActionProps} props - The props for the `HeaderAction` component.
 * @returns {React.ReactNode} The rendered `HeaderAction` component.
 */
function HeaderAction(props: HeaderActionProps<LibraryTypes>): React.ReactNode {
  const {
    ActionComponent,
    backgroundColor,
    icon,
    iconColor,
    iconLibrary,
    onPress,
    size,
    text,
    textSub,
    tx,
    txOptions,
    txOptionsSub,
    txSub,
  } = props
  const { colors } = useColor()

  const i18nTitle = tx && translate(tx, txOptions)
  const titleContent = i18nTitle || text

  const i18nSubTitle = txSub && translate(txSub, txOptionsSub)
  const subTitleContent = i18nSubTitle || textSub

  if (ActionComponent) return ActionComponent

  if (titleContent || subTitleContent) {
    return (
      <TouchableOpacity
        style={[actionTextContainer, { backgroundColor }]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}>
        {titleContent && <Text preset="h1" text={titleContent} />}
        {subTitleContent && (
          <Text
            preset="h2"
            style={lineHeight}
            weight="light"
            color={colors.accent}
            text={subTitleContent}
          />
        )}
      </TouchableOpacity>
    )
  }

  if (icon) {
    return (
      <Icon
        icon={icon}
        size={size || 24}
        library={iconLibrary}
        color={iconColor}
        onPress={onPress}
        containerStyle={[actionIconContainer, { backgroundColor }]}
        style={isRTL ? { transform: [{ rotate: '180deg' }] } : {}}
      />
    )
  }

  return <View style={[actionFillerContainer, { backgroundColor }]} />
}

const wrapper: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: sizing.spacing.sm,
  ...Platform.select({
    web: {
      marginVertical: sizing.spacing.sm,
    },
  }),
}

const container: ViewStyle = {
  maxHeight: 85,
  width: '100%',
}

const maxHeight: ViewStyle = {
  maxHeight: 100,
}

const lineHeight: TextStyle = {
  lineHeight: scaledSize(35),
}

const titleStyle: TextStyle = {
  textAlign: 'center',
}

const actionTextContainer: ViewStyle = {
  flexGrow: 0,
  height: '100%',
  justifyContent: 'center',
  paddingHorizontal: sizing.spacing.lg,
  zIndex: 2,
}

const actionIconContainer: ViewStyle = {
  alignItems: 'center',
  flexGrow: 0,
  height: '100%',
  justifyContent: 'center',
  paddingHorizontal: sizing.spacing.lg,
  zIndex: 2,
}

const actionFillerContainer: ViewStyle = {
  width: 16,
}

const titleWrapperCenter: ViewStyle = {
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center',
  paddingHorizontal: sizing.spacing.xxl,
  position: 'absolute',
  width: '100%',
  zIndex: 1,
}

const titleWrapperFlex: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'center',
}
