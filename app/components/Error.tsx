import React from 'react'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'

import { Text } from 'app/components/Text'
import { sizing } from 'app/theme'

export interface ErrorProps {
  error?: any
  errorContainerStyle?: StyleProp<ViewStyle>
  errorStyle?: StyleProp<TextStyle>
}

export const ErrorComponent = ({ error, errorContainerStyle, errorStyle }: ErrorProps) => {
  return (
    <View style={[errorView, errorContainerStyle]}>
      {error ? (
        <Text preset="small" style={[helperText, errorStyle]}>
          {error}
        </Text>
      ) : null}
    </View>
  )
}

const MemorizedError = React.memo(ErrorComponent)
MemorizedError.displayName = 'Error'
export { MemorizedError as Error }

const errorView: ViewStyle = {
  marginHorizontal: sizing.spacing.md,
  marginTop: sizing.spacing.xxs,
}

const helperText: TextStyle = {
  fontSize: 14,
}
