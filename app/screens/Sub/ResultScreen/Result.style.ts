import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'
import { scaleHeight } from 'app/utils'

export const resultStyles = ({ background }: Palette) =>
  StyleSheet.create({
    button: {
      bottom: sizing.spacing.lg,
      height: 50,
      left: sizing.spacing.lg,
      position: 'absolute',
      right: sizing.spacing.lg,
      width: 'auto',
      zIndex: 1,
    },
    card: {
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginVertical: sizing.spacing.md,
    },
    container: {
      backgroundColor: background,
      flex: 1,
      paddingHorizontal: sizing.spacing.lg,
    },
    imgNoContent: {
      aspectRatio: 1,
      height: scaleHeight(100),
    },
    imgNoContentContainer: {
      alignItems: 'center',
    },
    list: {
      paddingBottom: 80,
      paddingVertical: sizing.spacing.xs,
    },
  })
