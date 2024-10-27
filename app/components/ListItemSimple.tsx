import React from 'react'
import { Platform, Pressable, StyleSheet } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Icon, IconProps, LibraryTypes, Text } from 'app/components'
import { Palette, shadows, sizing } from 'app/theme'

interface ListItemProps<T extends LibraryTypes> {
  colors: Palette
  item: string
  endIcon?: IconProps<T>['icon']
  endIconLibrary?: T
}

const ListItemSimpleComponent = ({
  colors,
  endIcon = 'right',
  endIconLibrary = 'AntDesign',
  item,
}: ListItemProps<LibraryTypes>) => {
  const styles = listItemStyles()

  return (
    <Pressable style={styles.touchable}>
      <LinearGradient
        style={styles.gradient}
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text preset="h5">{item}</Text>
        <Icon icon={endIcon} library={endIconLibrary} color={colors.accent} />
      </LinearGradient>
    </Pressable>
  )
}

const MemorizedListItemSimple = React.memo(ListItemSimpleComponent)
MemorizedListItemSimple.displayName = 'ListItemSimple'
export { MemorizedListItemSimple as ListItemSimple }

/* eslint-disable react-native/no-unused-styles */
const listItemStyles = () =>
  StyleSheet.create({
    gradient: {
      alignItems: 'center',
      borderRadius: sizing.radius.lg,
      columnGap: sizing.spacing.xs,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: sizing.spacing.lg,
    },
    touchable: {
      borderRadius: sizing.radius.lg,
      flex: 1,
      marginVertical: sizing.spacing.xs,
      ...Platform.select({
        web: {
          elevation: shadows.android.large,
        },
      }),
    },
  })
