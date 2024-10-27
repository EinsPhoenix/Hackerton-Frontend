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
    emailContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    radarContainer: {
      alignItems: 'center',
      height: 500,
      marginVertical: 100,
      width: '100%',
    },
    textcontainer: {
      alignSelf: 'center',
      height: 200,
      marginVertical: 20,
      width: '100%',
    },
  })
