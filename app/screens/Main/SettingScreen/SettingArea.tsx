import React, { useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'

import { AnimatedTouchableOpacity, Text, Toggle } from 'app/components'
import { useAppContext } from 'app/context'
import { Palette, sizing } from 'app/theme'

interface SettingAreaProps {
  setting?: string
  settings?: string[]
  active?: (item?: string) => boolean
  handleClick: (item?: string) => any
  preset?: 'switch' | 'individual' | 'multi'
}

const SettingArea: React.FC<SettingAreaProps> = ({
  active,
  handleClick,
  preset = 'individual',
  setting,
  settings,
}) => {
  const { colors } = useAppContext()
  const styles = settingStyles(colors)

  const [switchValue, setSwitchValue] = useState(() => (active ? active() : false))

  const toggleSwitch = () => {
    const newState = !switchValue
    setSwitchValue(newState)
    handleClick()
  }

  const renderIndividualSetting = () => (
    <AnimatedTouchableOpacity onPress={() => handleClick()} containerStyle={styles.item}>
      <Text preset="h4">{setting}</Text>
    </AnimatedTouchableOpacity>
  )

  const renderMultiSetting = () => (
    <>
      {settings?.map((item, index) => (
        <React.Fragment key={index}>
          <AnimatedTouchableOpacity
            onPress={handleClick(item)}
            containerStyle={[styles.item, active?.(item) && styles.activeItem]}>
            <Text preset="h4">{item}</Text>
          </AnimatedTouchableOpacity>
          {index < settings.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </>
  )

  const renderSwitchSetting = () => (
    <AnimatedTouchableOpacity onPress={toggleSwitch} containerStyle={styles.item}>
      <Text preset="h4">{setting}</Text>
      <Toggle
        variant="switch"
        onPress={toggleSwitch}
        value={switchValue}
        inputOuterStyle={styles.switch}
        switchIconLibrary="Ionicons"
        switchIconView="flashlight"
        switchIconHidden="moon"
        switchAccessibilityMode="icon"
      />
    </AnimatedTouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {preset === 'individual' && renderIndividualSetting()}
      {preset === 'multi' && renderMultiSetting()}
      {preset === 'switch' && renderSwitchSetting()}
    </View>
  )
}

/* eslint-disable react-native/no-unused-styles */
const settingStyles = ({ accent, background, backgroundSecondary }: Palette) =>
  StyleSheet.create({
    activeItem: {
      backgroundColor: accent,
      borderRadius: sizing.radius.lg,
    },
    container: {
      backgroundColor: backgroundSecondary,
      borderRadius: sizing.radius.lg,
      marginBottom: sizing.spacing.xs,
      marginTop: sizing.spacing.xxs,
      ...Platform.select({
        web: {
          width: 400,
        },
      }),
    },
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 40,
      justifyContent: 'space-between',
      ...Platform.select({
        web: {
          width: 400,
        },
      }),
      paddingHorizontal: sizing.spacing.sm,
      width: '100%',
    },
    separator: {
      backgroundColor: background,
      height: 1,
    },
    switch: {
      backgroundColor: background,
    },
  })

export default SettingArea
