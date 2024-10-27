import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'
import { scaleHeight } from 'app/utils'

export const quizGenerationStyles = ({ background, text }: Palette) =>
  StyleSheet.create({
    button: {
      bottom: sizing.spacing.md,
      height: 50,
      left: sizing.spacing.md,
      position: 'absolute',
      right: sizing.spacing.md,
      width: 'auto',
    },
    container: {
      backgroundColor: background,
      flex: 1,
      paddingHorizontal: sizing.spacing.lg,
    },
    disabledText: {
      color: text,
    },
    img: {
      borderRadius: sizing.radius.lg,
      height: '100%',
      width: '100%',
    },
    imgContainer: {
      height: 200,
      marginBottom: sizing.spacing.md,
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
