import { Platform, StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'

export const settingStyles = ({ background }: Palette) =>
  StyleSheet.create({
    container: {
      backgroundColor: background,
      flexGrow: 1,
      paddingHorizontal: sizing.spacing.lg,
    },
    content: {
      flex: 1,
      paddingVertical: sizing.spacing.sm,
      ...Platform.select({
        web: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: sizing.spacing.md,
          justifyContent: 'center',
        },
      }),
    },
  })
