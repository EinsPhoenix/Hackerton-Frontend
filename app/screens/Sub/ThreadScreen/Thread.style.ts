import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'

export const threadStyles = ({ background }: Palette) =>
  StyleSheet.create({
    button: {
      height: 50,
      margin: sizing.spacing.md,
      width: 'auto',
    },
    container: {
      backgroundColor: background,
      flexGrow: 1,
      paddingHorizontal: sizing.spacing.lg,
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
    votingContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: sizing.spacing.lg,
    },
  })
