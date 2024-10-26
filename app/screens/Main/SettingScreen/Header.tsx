import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'

import { Images } from 'assets/images'

import { Image, Text } from 'app/components'
import { sizing } from 'app/theme'
import { scaleHeight } from 'app/utils'

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.APP_IMAGE} style={styles.img} />
      <View>
        <Text preset="h4" weight="bold" tx="screen.setting.slogan" />
        <Text preset="h4" tx="screen.setting.version" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    columnGap: sizing.spacing.sm,
    flexDirection: 'row',
    ...Platform.select({
      web: {
        justifyContent: 'center',
      },
    }),
  },
  img: {
    aspectRatio: 1,
    height: scaleHeight(100),
  },
})

export default Header
