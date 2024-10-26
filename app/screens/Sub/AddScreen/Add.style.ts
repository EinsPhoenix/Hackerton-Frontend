import { Platform, StyleSheet } from 'react-native'

import { Palette, sizing } from 'app/theme'
import { scaleHeight } from 'app/utils'

export const addStyles = ({ background }: Palette) =>
  StyleSheet.create({
    button: {
      height: 50,
      marginVertical: sizing.spacing.lg,
      width: 'auto',
    },
    container: {
      backgroundColor: background,
      flexGrow: 1,
      paddingHorizontal: sizing.spacing.lg,
    },
    fixedTextHeight: {
      ...Platform.select({
        web: {
          height: scaleHeight(50),
        },
      }),
    },
    generateButton: {
      borderRadius: sizing.radius.lg,
      height: 50,
      marginVertical: sizing.spacing.xs,
    },
    img: {
      height: '100%',
      width: '100%',
    },
    imgContainer: {
      height: 200,
    },
    innerTagContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      minWidth: 200,
    },
    scroll: {
      flexGrow: 1,
      height: '100%',
      paddingBottom: 75,
    },
    space: {
      marginVertical: scaleHeight(sizing.spacing.xs),
    },
    summary: {
      flex: 2,
      minWidth: 400,
    },
    summaryButton: {
      borderRadius: sizing.radius.lg,
      flex: 1,
      height: 50,
      marginVertical: sizing.spacing.xs,
      minWidth: 200,
    },
    summaryContainer: {
      columnGap: sizing.spacing.xs,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: sizing.spacing.xs,
      marginTop: sizing.spacing.xl,
    },
  })
