import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'

export const threadStyles = ({ background }: Palette) =>
  StyleSheet.create({
    container: {
      backgroundColor: background,
      flexGrow: 1,
      paddingHorizontal: sizing.spacing.lg,
    },
  })
