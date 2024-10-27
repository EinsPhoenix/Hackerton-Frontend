import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'

import { Images } from 'assets/images'

import { Button, Image, Text } from 'app/components'
import { sizing } from 'app/theme'
import { JwtClaims, scaleHeight } from 'app/utils'

interface HeaderProps {
  jwtClaims?: JwtClaims
  handleDelete: () => void
  handleChangeImage: () => void
  image?: string
}

const Header = ({ handleChangeImage, handleDelete, image, jwtClaims }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChangeImage}>
        <Image source={image || Images.PROFILE_PLACEHOLDER} style={styles.img} contentFit="cover" />
      </TouchableOpacity>
      <View>
        <Text preset="h4" weight="bold" text={jwtClaims?.username} />
        <Text preset="h4" text={jwtClaims?.email} />
        <Button buttonContainerStyle={styles.button} tx="common.deleteAcc" onPress={handleDelete} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 25,
    marginTop: sizing.spacing.xs,
    paddingHorizontal: sizing.spacing.xs,
  },
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
    borderRadius: 1000,
    height: scaleHeight(100),
  },
})

export default Header
