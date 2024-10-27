import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'

export const libraryStyles = ({ background }: Palette) =>
  StyleSheet.create({
    container: {
      backgroundColor: background,
      flexGrow: 1,
      paddingHorizontal: sizing.spacing.lg,
      rowGap: 50,
    },
    list: {
      flex: 1,
    },
  })
