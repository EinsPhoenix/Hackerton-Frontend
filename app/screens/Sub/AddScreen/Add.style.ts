import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'
import { scaleHeight } from 'app/utils'

export const addStyles = ({ background }: Palette) =>
  StyleSheet.create({
    button: {
      bottom: 0,
      height: 50,
      marginVertical: sizing.spacing.sm,
      position: 'absolute',
    },
    container: {
      backgroundColor: background,
      flexGrow: 1,
      paddingHorizontal: sizing.spacing.lg,
    },
    input: {
      marginVertical: scaleHeight(sizing.spacing.xs),
    },
    scroll: {
      flexGrow: 1,
      height: '100%',
      paddingBottom: 58,
    },
  })
