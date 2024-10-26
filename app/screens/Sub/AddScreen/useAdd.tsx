import * as yup from 'yup'

import { useAppContext } from 'app/context'
import { translate } from 'app/i18n'
import { ScreenTypes } from 'app/navigators'
import { logger, useHeader } from 'app/utils'

import { addStyles } from './Add.style'

const useAdd = () => {
  const { colors, navigation } = useAppContext()
  const styles = addStyles(colors)

  const goBack = () => {
    if (navigation.canGoBack()) return navigation.goBack()

    navigation.navigate(ScreenTypes.MAIN, { screen: ScreenTypes.LIBRARY })
  }

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      onLeftPress: goBack,
      titleMode: 'center',
      titleTx: 'screens.add',
    },
    [goBack],
  )

  const fieldValidation = yup.object().shape({
    titel: yup
      .string()
      .trim() // Remove whitespace from both ends
      .required(translate('validation.emailOrUsername.required')), // Custom error message for required field
  })

  const initialValues = {
    titel: '',
  }

  const handleCreateThread = (values: typeof initialValues) => {
    logger.log(values)
  }

  return {
    fieldValidation,
    handleCreateThread,
    initialValues,
    styles,
  }
}

export default useAdd
