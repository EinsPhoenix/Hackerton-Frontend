import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'
import { scaleHeight } from 'app/utils'

export const homeStyles = ({ background }: Palette) =>
  StyleSheet.create({
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
    input: {
      paddingTop: sizing.spacing.xl,
    },
    list: {
      paddingVertical: sizing.spacing.xs,
    },
  })
