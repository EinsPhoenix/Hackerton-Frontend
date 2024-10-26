import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'

export const profileStyles = ({ background }: Palette) =>
  StyleSheet.create({
    container: {
      backgroundColor: background,
      flexGrow: 1,
      paddingHorizontal: sizing.spacing.lg,
      paddingVertical: sizing.spacing.xxl,
    },
  })
