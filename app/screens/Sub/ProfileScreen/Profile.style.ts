import { StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'

export const profileStyles = ({ background }: Palette) =>
  StyleSheet.create({
    column: {
      flex: 1,
      minWidth: 200,
      padding: sizing.spacing.lg,
    },
    container: {
      alignItems: 'center',
      backgroundColor: background,
      flexGrow: 1,
      justifyContent: 'center',
      paddingBottom: sizing.spacing.lg,
      paddingHorizontal: sizing.spacing.lg,
    },
    content: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: sizing.spacing.lg,
    },
  })
