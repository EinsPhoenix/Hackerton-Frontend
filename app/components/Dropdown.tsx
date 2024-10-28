import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react'
import {
  DimensionValue,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { Icon, Text } from 'app/components'
import { useColor } from 'app/context'
import { sizing } from 'app/theme'
import { logger } from 'app/utils'

interface DropdownItem {
  key: string
  value: string
}

export type CustomDropdownRef = TextInput & {
  reset: () => void
  setSelectedItems: (items: string[]) => void
}

interface DropdownProps {
  title?: string
  items: DropdownItem[]
  openHeight?: number
  duration?: number
  initialOpen?: boolean
  borderColor?: string
  backgroundColor?: string
  secondaryColor?: string
  textColor?: string
  width?: DimensionValue
  multiSelect?: boolean
  onPress?: (keys: string[] | string) => void
  ref?: React.Ref<CustomDropdownRef | null>
}

const ITEM_HEIGHT = 50

const DropdownComponent = (props: DropdownProps, ref?: React.Ref<CustomDropdownRef | null>) => {
  const {
    backgroundColor,
    borderColor,
    initialOpen = false,
    items,
    multiSelect = false,
    onPress,
    openHeight = 200,
    secondaryColor,
    textColor,
    title,
    width,
  } = props

  const { colors } = useColor()
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const dropdownHeight = useSharedValue(initialOpen ? openHeight : 0)

  // Determine the dropdown title based on single or multiple selections
  const displayedTitle =
    selectedItems.length > 0
      ? !selectedItems.some(item => item === 'None') &&
        selectedItems.map(key => items.find(item => item.key === key)?.value).join(', ')
      : title || items[0].value

  useEffect(() => {
    logger.log(items, selectedItems)
  }, [selectedItems])

  // Filter items to avoid showing selected items
  const filteredItems = items.filter(item => !selectedItems.includes(item.key))

  // Calculate the content height based on the number of filtered items
  const contentHeight = Math.min(filteredItems.length * ITEM_HEIGHT, openHeight)

  // Toggle function to open/close dropdown
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => {
      dropdownHeight.value = withSpring(prev ? 0 : contentHeight, {
        damping: 40,
        stiffness: 200,
      })
      return !prev
    })
  }, [dropdownHeight, contentHeight])

  // Handle item selection based on multiSelect mode
  const handleSelectItem = (item: DropdownItem) => {
    logger.log('Dropdown selected:', item.value)

    setSelectedItems(prevSelected => {
      // Remove the oldest item if 5 items are already selected
      if (multiSelect && prevSelected.length >= 3) {
        const updatedSelectedItems = [...prevSelected.slice(1), item.key]
        if (onPress) onPress(updatedSelectedItems)
        return updatedSelectedItems
      }

      // Otherwise, add or remove the selected item
      const newSelectedItems = prevSelected.includes(item.key)
        ? prevSelected.filter(key => key !== item.key)
        : [...prevSelected, item.key]

      if (onPress) onPress(newSelectedItems)
      return newSelectedItems
    })

    if (!multiSelect) {
      setSelectedItems([item.key])
      toggleDropdown() // Close dropdown after selection in single-select mode
      if (onPress) onPress(item.key)
    }
  }

  // @ts-ignore
  useImperativeHandle(ref, () => {
    return {
      setSelectedItems: items => {
        setSelectedItems(items)
      },
    }
  })

  // Reanimated style for height animation
  const animatedStyle = useAnimatedStyle(() => ({
    height: dropdownHeight.value,
    overflow: 'hidden',
  }))

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    width ? { width } : {},
    { borderColor: borderColor || colors.border },
  ]

  const headerStyles: StyleProp<ViewStyle> = [
    styles.item,
    {
      alignItems: 'center',
      backgroundColor: secondaryColor || colors.backgroundSecondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  ]

  return (
    <View style={containerStyles}>
      {/* Header with selected item(s) or default title */}
      <TouchableOpacity style={headerStyles} onPress={toggleDropdown}>
        <Text preset="h3" weight="semiBold" style={{ color: textColor || colors.text }}>
          {displayedTitle || title}
        </Text>
        <Icon
          icon={isOpen ? 'chevron-up' : 'chevron-down'}
          library="Ionicons"
          color={textColor || colors.text}
        />
      </TouchableOpacity>

      {/* Animated dropdown list */}
      <Animated.View
        style={[animatedStyle, { backgroundColor: backgroundColor || colors.background }]}>
        {isOpen && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            style={{ maxHeight: openHeight }}>
            {filteredItems.map(item => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.item,
                  selectedItems.includes(item.key) && {
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}
                onPress={() => handleSelectItem(item)}>
                <Text preset="h3" weight="regular" style={{ color: textColor || colors.text }}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </Animated.View>
    </View>
  )
}

const ForwardedDropdown = React.forwardRef<CustomDropdownRef, DropdownProps>(DropdownComponent)
ForwardedDropdown.displayName = 'Dropdown'
export { ForwardedDropdown as Dropdown }

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: sizing.radius.lg,
    borderWidth: 1,
    marginVertical: sizing.spacing.xs,
    overflow: 'hidden',
    width: '80%',
  },
  item: {
    flex: 1,
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    minHeight: ITEM_HEIGHT,
    paddingHorizontal: sizing.spacing.md,
  },
})
