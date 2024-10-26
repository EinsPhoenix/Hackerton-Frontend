import { Platform, StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'
import { scaleHeight } from 'app/utils'

export const loginStyles = ({ accent, backgroundSecondary }: Palette) =>
  StyleSheet.create({
    barStyle: {
      backgroundColor: backgroundSecondary,
      flex: 1,
      height: 1,
    },
    button: {
      height: 50,
      marginVertical: sizing.spacing.sm,
    },
    buttonContainer: {
      marginVertical: sizing.spacing.lg,
    },
    card: {
      flex: 1,
      maxWidth: 500,
      width: '100%',
      ...Platform.select({
        web: {
          borderColor: backgroundSecondary,
          borderRadius: sizing.radius.lg,
          borderWidth: 1,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          marginVertical: sizing.spacing.sm,
          maxHeight: 670,
          padding: sizing.spacing.xl,
        },
      }),
    },
    container: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: sizing.spacing.lg,
      paddingVertical: sizing.spacing.xxl,
    },
    content: {
      flex: 5,
    },
    footer: {
      alignItems: 'flex-end',
      columnGap: sizing.spacing.xxs,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: sizing.spacing.xl,
      ...Platform.select({
        web: {
          paddingBottom: 0,
        },
      }),
    },
    header: {
      flex: 2,
      minHeight: 200,
    },
    headerText: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: sizing.spacing.md,
    },
    img: {
      aspectRatio: 1,
      height: '100%',
    },
    imgContainer: {
      alignItems: 'center',
      height: '50%',
      justifyContent: 'center',
    },
    input: {
      marginVertical: scaleHeight(sizing.spacing.xs),
    },
    register: {
      color: accent,
      cursor: 'pointer',
    },
    spacerContainer: {
      alignItems: 'center',
      columnGap: sizing.spacing.xs,
      flexDirection: 'row',
      height: sizing.spacing.lg,
    },
  })
