import React from 'react'
import { StyleSheet, View } from 'react-native'

import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'

import { Text } from 'app/components'
import { useColor } from 'app/context'
import { shadows } from 'app/theme'

interface CircleDiagramProps {
  maxPoints: number
  pointsReached: number
}

const CircleDiagram = ({ maxPoints, pointsReached }: CircleDiagramProps) => {
  const radius = 60
  const strokeWidth = 12
  const circumference = 2 * Math.PI * radius
  const progress = (pointsReached / maxPoints) * circumference
  const { colors } = useColor()

  return (
    <View style={styles.container}>
      <Svg height={radius * 2 + strokeWidth * 2} width={radius * 2 + strokeWidth * 2}>
        <Defs>
          <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors.accent300} />
            <Stop offset="100%" stopColor={colors.accent100} />
          </LinearGradient>
        </Defs>

        {/* Background Circle */}
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={colors.backgroundSecondary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeOpacity={1}
        />

        {/* Progress Circle */}
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </Svg>

      {/* Centered Points Text */}
      <View style={styles.textContainer}>
        <Text preset="h2">{pointsReached}</Text>
        <Text preset="h5" color={colors.accent}>
          / {maxPoints}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.ios.medium,
    elevation: shadows.android.medium,
  },
  textContainer: {
    alignItems: 'center',
    position: 'absolute',
  },
})

export default CircleDiagram
