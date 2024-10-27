import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'

export const quizStyles = ({ accent, backgroundSecondary }: Palette) =>
  StyleSheet.create({
    active: {
      backgroundColor: accent,
    },
    button: {
      flex: 1,
      height: 50,
    },
    buttonContainer: {
      bottom: sizing.spacing.lg,
      columnGap: sizing.spacing.lg,
      flexDirection: 'row',
      left: sizing.spacing.lg,
      position: 'absolute',
      right: sizing.spacing.lg,
    },
    circleButton: {
      height: 50,
      width: 50,
    },
    container: {
      flex: 1,
      paddingBottom: 35,
    },
    disabledText: {
      color: accent,
    },
    headerContainer: {
      marginTop: sizing.spacing.sm,
    },
    inactive: {
      backgroundColor: backgroundSecondary,
    },
    input: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: sizing.spacing.lg,
    },
    progressContainer: {
      columnGap: sizing.spacing.sm,
      flexDirection: 'row',
      height: 70,
      marginHorizontal: sizing.spacing.lg,
    },
    progressDot: {
      alignItems: 'center',
      backgroundColor: backgroundSecondary,
      borderRadius: 100,
      height: 50,
      justifyContent: 'center',
      width: 50,
    },
    question: {
      marginHorizontal: sizing.spacing.lg,
    },
  })
