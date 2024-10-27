import { Platform, StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'

export const welcomeStyles = ({ background, backgroundSecondary, text }: Palette) =>
  StyleSheet.create({
    bottomContainer: {
      backgroundColor: backgroundSecondary,
      borderTopLeftRadius: sizing.radius.lg,
      borderTopRightRadius: sizing.radius.lg,
      flex: 1,
      justifyContent: 'space-around',
      minHeight: 200,
      paddingHorizontal: sizing.spacing.lg,
      paddingTop: sizing.spacing.lg,
    },
    button: {
      height: 50,
      marginHorizontal: 'auto',
      marginVertical: sizing.spacing.sm,
      maxWidth: 400,
    },
    container: {
      flexGrow: 1,
    },
    disabled: {
      backgroundColor: background,
    },
    disabledText: {
      color: text,
    },
    img: {
      aspectRatio: 1,
      height: '70%',
    },
    imgContainer: {
      alignItems: 'center',
      flex: 2,
      justifyContent: 'center',
      ...Platform.select({
        web: {
          flex: 1,
        },
      }),
    },
    topContainer: {
      flex: 1,
      justifyContent: 'center',
      minHeight: 300,
      paddingHorizontal: sizing.spacing.lg,
    },
    topText: {
      flex: 1,
    },
  })
