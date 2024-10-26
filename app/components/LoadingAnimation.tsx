import React, { useEffect, useRef } from 'react'
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { Easing } from 'react-native-reanimated'

import { useColor } from 'app/context'
import { screenWidth } from 'app/utils'

function hexToHsl(hex: string) {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // Achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6 // Normalize to [0, 1]
  }

  return [h * 360, s * 100, l * 100] // Return HSL values
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l // Achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h / 360 + 1 / 3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1 / 3)
  }

  return `#${(
    (1 << 24) +
    (Math.round(r * 255) << 16) +
    (Math.round(g * 255) << 8) +
    Math.round(b * 255)
  )
    .toString(16)
    .slice(1)}`
}

function generateSimilarColors(hexColor: string) {
  const [h, s, l] = hexToHsl(hexColor)
  const similarColors = []

  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      // Exclude the original color
      // Create variations by changing the lightness and saturation
      const newLightness = Math.min(Math.max(l + i * 5, 0), 100) // Adjust lightness
      const newSaturation = Math.min(Math.max(s, 0), 100) // Keep saturation constant
      similarColors.push(hslToHex(h, newSaturation, newLightness))
    }
  }

  return similarColors
}

export interface LoadingAnimationProps {
  loading: boolean
  position?: number
  thickness?: number
}

export interface BarProps {
  animation: Animated.Value
  color: string
  duration: number
  width: number
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  loading,
  position,
  thickness,
}) => {
  const { colors } = useColor()
  const similarColors = generateSimilarColors(colors.accent)

  const bars = useRef([
    { animation: new Animated.Value(-2000), color: similarColors[0], duration: 1000, width: 2000 },
    { animation: new Animated.Value(-1000), color: similarColors[1], duration: 2000, width: 1000 },
    { animation: new Animated.Value(-1000), color: similarColors[2], duration: 1000, width: 700 },
    { animation: new Animated.Value(-300), color: similarColors[3], duration: 1200, width: 200 },
    { animation: new Animated.Value(-250), color: similarColors[4], duration: 1400, width: 250 },
    { animation: new Animated.Value(-400), color: similarColors[5], duration: 1600, width: 300 },
    { animation: new Animated.Value(-450), color: similarColors[6], duration: 1800, width: 350 },
    { animation: new Animated.Value(-200), color: similarColors[7], duration: 2000, width: 400 },
  ]).current

  const startAnimation = (bar: BarProps) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(bar.animation, {
          duration: bar.duration,
          easing: Easing.ease,
          toValue: screenWidth + bar.width,
          useNativeDriver: true,
        }),
        Animated.timing(bar.animation, {
          // Move back to left off-screen
          duration: 0,
          toValue: -bar.width,
          useNativeDriver: true,
        }),
      ]),
    )
  }

  useEffect(() => {
    if (loading) {
      bars.forEach(bar => {
        startAnimation(bar).start()
      })
    } else {
      // Stop animations when not loading
      bars.forEach(bar => {
        bar.animation.resetAnimation()
        bar.animation.setValue(-bar.width) // Reset to start position
      })
    }
  }, [loading])

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    position ? { top: position } : {},
  ]

  return (
    loading && (
      <View style={containerStyles}>
        {bars.map((bar, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              thickness ? { height: thickness } : {},
              {
                backgroundColor: bar.color,
                transform: [{ translateX: bar.animation }],
                width: bar.width, // Move the bar based on animation value
              },
            ]}
          />
        ))}
      </View>
    )
  )
}

const styles = StyleSheet.create({
  bar: {
    height: 5,
    position: 'absolute',
  },
  container: {
    height: 5,
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
})
