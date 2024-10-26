import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import { Text } from 'app/components'
import { useColor } from 'app/context'
import { Preference } from 'app/services'
import { shadows, sizing } from 'app/theme'

interface PreferencesListProps {
  preferences: Preference[]
  setPreferences: React.Dispatch<React.SetStateAction<Preference[]>>
}

export const PREFERENCES: Preference[] = [
  { chosen: 0, preference: 'Technology' },
  { chosen: 0, preference: 'Science' },
  { chosen: 0, preference: 'Music' },
  { chosen: 0, preference: 'Culture' },
  { chosen: 0, preference: 'Sports' },
  { chosen: 0, preference: 'Movies and Series' },
  { chosen: 0, preference: 'Education' },
  { chosen: 0, preference: 'Literature' },
  { chosen: 0, preference: 'History' },
  { chosen: 0, preference: 'Travel' },
  { chosen: 0, preference: 'Nature and Environment' },
  { chosen: 0, preference: 'Fashion' },
  { chosen: 0, preference: 'Culinary' },
  { chosen: 0, preference: 'Psychology' },
  { chosen: 0, preference: 'Finance' },
  { chosen: 0, preference: 'Space Exploration' },
  { chosen: 0, preference: 'Gaming' },
  { chosen: 0, preference: 'Creativity and Design' },
  { chosen: 0, preference: 'Art' },
]

const PreferencesList: React.FC<PreferencesListProps> = ({ preferences, setPreferences }) => {
  const { colors } = useColor()

  const togglePreferenceSelection = (preference: Preference) => {
    const updatedPreferences = preferences.map(item =>
      item.preference === preference.preference
        ? { ...item, chosen: item.chosen === 1 ? 0 : 1 }
        : item,
    )

    setPreferences(updatedPreferences)
  }

  const renderItem = ({ item }: { item: Preference }) => {
    const isSelected = item.chosen === 1
    const preferencesContainerStyles = [
      styles.themeBox,
      { backgroundColor: colors.backgroundSecondary, borderColor: colors.accent },
      isSelected && { backgroundColor: colors.accent },
    ]

    return (
      <TouchableOpacity
        style={preferencesContainerStyles}
        onPress={() => togglePreferenceSelection(item)}>
        <Text preset="h5" text={item.preference} />
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={preferences}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={item => item.preference}
      horizontal={false}
      contentContainerStyle={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: sizing.spacing.sm,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  themeBox: {
    ...shadows.ios.large,
    alignItems: 'center',
    borderRadius: sizing.radius.md,
    borderWidth: 1,
    elevation: shadows.android.large,
    justifyContent: 'center',
    marginBottom: sizing.spacing.xxs,
    marginRight: sizing.spacing.xxs,
    minWidth: 100,
    paddingHorizontal: sizing.spacing.xs,
    paddingVertical: sizing.spacing.xxs,
  },
})

export default PreferencesList
