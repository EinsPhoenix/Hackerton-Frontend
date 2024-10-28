import React, { useRef, useState } from 'react'
import {
  Animated,
  PanResponder,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Icon, Image, Text } from 'app/components/index'
import { navigate, ScreenTypes } from 'app/navigators'
import { ThreadResult, VotingParams } from 'app/services'
import { Palette, shadows, sizing } from 'app/theme'
import { logger, shortenText, showSuccessToast } from 'app/utils'

interface ListItemProps {
  colors: Palette
  item: ThreadResult
  updateVoting?: (votingParams: VotingParams) => void
  disableSwipe?: boolean
}

export const ListItemDetailComponent = ({
  colors,
  disableSwipe,
  item,
  updateVoting,
}: ListItemProps) => {
  const dragX = useRef(new Animated.Value(0)).current
  const [isSwiped, setIsSwiped] = useState(false)
  const [vote, setVote] = useState(0)
  const styles = listItemStyles()

  const resetDrag = () => {
    Animated.spring(dragX, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => setIsSwiped(false)) // Reset swipe state after the animation completes
  }

  const voteAction = (state: -1 | 1) => {
    setVote(prev => {
      if (prev !== state) {
        const header = state === 1 ? 'success.like' : 'success.dislike'
        showSuccessToast(header, undefined, {
          threadTitle: shortenText(item.titel, 20),
        })
      }

      return prev === state ? 0 : state
    })
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > sizing.threshold.small
      },
      onPanResponderMove: (_event, gestureState) => {
        dragX.setValue(gestureState.dx)
      },
      onPanResponderRelease: (__event, gestureState) => {
        setIsSwiped(true)

        const votingParams = {
          voteable: 'thread',
          voteable_id: item.id_thread,
        }

        if (gestureState.dx > sizing.threshold.normal) {
          voteAction(-1)
          updateVoting && updateVoting({ ...votingParams, upvoteType: 'downvote' })
        } else if (gestureState.dx < -sizing.threshold.normal) {
          voteAction(1)
          updateVoting && updateVoting({ ...votingParams, upvoteType: 'upvote' })
        }

        resetDrag()
      },
      onPanResponderTerminate: () => {
        resetDrag()
      },
    }),
  ).current

  const goThread = () => {
    logger.log(item)
    if (!isSwiped) {
      navigate(ScreenTypes.SUB, { params: { item }, screen: ScreenTypes.THREAD })
    }
  }

  return (
    <Animated.View
      {...(!disableSwipe && panResponder.panHandlers)}
      style={[styles.container, { transform: [{ translateX: dragX }] }]}>
      <Icon
        icon="heart-dislike"
        library="Ionicons"
        size={35}
        color={colors.accent}
        containerStyle={styles.dragItemLeftStyle}
      />
      <Pressable style={styles.touchable} onPress={goThread}>
        <LinearGradient
          style={styles.gradient}
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <Image source={item.image_url} style={styles.image} contentFit="cover" />
          <View style={styles.textContainer}>
            <View style={styles.topWrapper}>
              <Text preset="h3" weight="semiBold" textAlign="right" numberOfLines={1}>
                {item.titel}
              </Text>
              <Text preset="h6" textAlign="right" numberOfLines={4}>
                {item.content_summary}
              </Text>
            </View>
            <View style={styles.bottomWrapper}>
              <Text preset="h5">{item.created_by}</Text>
              <Text preset="h5" text="•" />
              <Text preset="h5" textAlign="right" color={colors.accent}>
                {item.upvotes + vote}
              </Text>
              <Icon icon="arrowup" library="AntDesign" color={colors.accent} />
            </View>
          </View>
        </LinearGradient>
      </Pressable>
      <Icon
        icon="heart"
        library="Ionicons"
        size={35}
        color={colors.accent}
        containerStyle={styles.dragItemRightStyle}
      />
    </Animated.View>
  )
}

const MemorizedListItemDetail = React.memo(ListItemDetailComponent)
MemorizedListItemDetail.displayName = 'ListItemDetail'
export { MemorizedListItemDetail as ListItemDetail }

const dragItemStyle: StyleProp<ViewStyle> = {
  bottom: 0,
  justifyContent: 'center',
  paddingHorizontal: sizing.spacing.xl,
  position: 'absolute',
  top: 0,
}

/* eslint-disable react-native/no-unused-styles */
const listItemStyles = () =>
  StyleSheet.create({
    bottomWrapper: {
      columnGap: sizing.spacing.xxs,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    container: {
      borderRadius: sizing.radius.lg,
      ...shadows.ios.large,
      ...Platform.select({
        web: {
          elevation: shadows.android.large,
          userSelect: 'none',
        },
      }),
      height: 140,
      marginVertical: sizing.spacing.xs,
    },
    dragItemLeftStyle: {
      left: -99,
      ...dragItemStyle,
    },
    dragItemRightStyle: {
      right: -99,
      ...dragItemStyle,
    },
    gradient: {
      borderRadius: sizing.radius.lg,
      columnGap: sizing.spacing.xs,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    image: {
      aspectRatio: 1,
      borderRadius: sizing.radius.lg,
      height: '100%',
    },
    textContainer: {
      flex: 1,
      justifyContent: 'space-between',
      maxWidth: '70%',
      overflow: 'hidden',
      paddingHorizontal: sizing.spacing.md,
      paddingVertical: sizing.spacing.xs,
    },
    topWrapper: {
      rowGap: sizing.spacing.xxs,
    },
    touchable: {
      flex: 1,
    },
  })
