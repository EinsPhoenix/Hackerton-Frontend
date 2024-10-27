import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Icon, Text } from 'app/components'
import { ImportantInfoResult } from 'app/services'
import { Palette, shadows, sizing } from 'app/theme'
import { formatDate, logger } from 'app/utils'

const ImportantInfo = ({
  colors,
  importantInfo,
}: {
  importantInfo?: ImportantInfoResult[]
  colors: Palette
}) => {
  const styles = infoStyles(colors)

  logger.log(importantInfo, 'A')

  return (
    <View style={styles.container}>
      {importantInfo?.map((info, index) => (
        <View key={index} style={styles.innerContainer}>
          <Text preset="h4" weight="semiBold">
            {info.information}
          </Text>
          <Text preset="h4" weight="light" color={colors.accent}>
            <Icon icon="calendar" library="AntDesign" color={colors.accent} />
            {formatDate(info.created_at)}
          </Text>
        </View>
      ))}
    </View>
  )
}

export default ImportantInfo

/* eslint-disable */
const infoStyles = ({ backgroundSecondary, background }: Palette) =>
  StyleSheet.create({
    container: {
      backgroundColor: backgroundSecondary,
      padding: sizing.spacing.xs,
      borderRadius: sizing.radius.lg,
      ...shadows.ios.large,
      elevation: shadows.android.large,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: sizing.spacing.xs,
    },
    innerContainer: {
      backgroundColor: background,
      borderRadius: sizing.radius.lg,
      padding: sizing.spacing.xs,
      justifyContent: 'space-between',
      maxWidth: 300,
      rowGap: sizing.spacing.xs,
    },
  })
