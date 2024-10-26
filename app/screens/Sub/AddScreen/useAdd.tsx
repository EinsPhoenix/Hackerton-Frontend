import React, { useEffect, useRef } from 'react'

import { FormikProps } from 'formik'
import * as yup from 'yup'

import { CustomDropdownRef } from 'app/components'
import { CustomTextInputRef } from 'app/components/Input/TextField.type'
import { useAppContext } from 'app/context'
import { translate } from 'app/i18n'
import { ScreenTypes } from 'app/navigators'
import { PreferenceValue } from 'app/screens/Entry/WelcomeScreen/PreferencesList'
import { AddThreadParams } from 'app/services'
import { shortenText, showErrorToast, showSuccessToast, useHeader } from 'app/utils'

import { addStyles } from './Add.style'

const useAdd = () => {
  const {
    colors,
    language,
    navigation,
    pickImage,
    threadStore: { getAIContent, getAITags, isLoading, postThread, setLoading },
  } = useAppContext()
  const styles = addStyles(colors)

  const formikRef = useRef<FormikProps<AddThreadParams>>(null)
  const inputRefs = useRef({
    content: React.createRef<CustomTextInputRef>(),
    content_summary: React.createRef<CustomTextInputRef>(),
  })
  const dropdownRefs = useRef({
    main_tag: React.createRef<CustomDropdownRef>(),
    subtags: React.createRef<CustomDropdownRef>(),
  })

  const goBack = () => {
    if (navigation.canGoBack()) return navigation.goBack()

    navigation.navigate(ScreenTypes.MAIN, { screen: ScreenTypes.LIBRARY })
  }

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      loading: isLoading,
      onLeftPress: goBack,
      titleMode: 'center',
      titleTx: 'screens.add',
    },
    [goBack],
  )

  const fieldValidation = yup.object().shape({
    content: yup.string().trim().required(translate('validation.content.required')),
    content_summary: yup.string().trim().required(translate('validation.contentSummary.required')),
    main_tag: yup.string().required(),
    subtags: yup.array().min(1),
    titel: yup.string().trim().required(translate('validation.titel.required')),
  })

  const initialValues: AddThreadParams = {
    content: '',
    content_summary: '',
    file: '',
    main_tag: '',
    subtags: [],
    titel: '',
  }

  const handleCreateThread = async (values: typeof initialValues) => {
    const success = await postThread(values)

    if (success) {
      formikRef.current?.resetForm()
      showSuccessToast('success.threadAdd', undefined, {
        threadTitle: shortenText(values.titel, 20),
      })
    }
  }

  const assignValue = (field: keyof typeof initialValues) => async (value: any) => {
    if (formikRef.current?.values && !['file'].includes(field)) {
      await formikRef.current.setFieldValue(field, value, true)
    }
  }

  const handleImagePick = async () => {
    const uri = await pickImage()
    await assignValue('file')(uri)
  }

  const handleGenerateContent = async () => {
    if (!formikRef.current?.values) return
    const { content, titel } = formikRef.current.values

    if (content.trim().length === 0 || titel.trim().length === 0)
      return showErrorToast('error.ai.requiredForContent')

    const generatedContent = await getAIContent(titel, content, language)
    inputRefs.current.content_summary.current?.setInput(generatedContent?.content_summary)
    await assignValue('content_summary')(generatedContent?.content_summary)
  }

  const handleGenerateTags = async () => {
    if (!formikRef.current?.values) return
    const { content, titel } = formikRef.current.values

    if (content.trim().length === 0 || titel.trim().length === 0)
      return showErrorToast('error.ai.requiredForTags')

    const generatedTags = await getAITags(content, titel)
    const mappedSubTags = generatedTags?.preferences.SubTags.map(
      (subtag: any, index) => subtag['SubTag' + (index + 1)] as PreferenceValue,
    )

    dropdownRefs.current.main_tag.current?.setSelectedItems([
      generatedTags?.preferences.MainTag.MainTag as string,
    ])
    dropdownRefs.current.subtags.current?.setSelectedItems(mappedSubTags as string[])
    await assignValue('main_tag')(generatedTags?.preferences.MainTag.MainTag)
    await assignValue('subtags')(mappedSubTags)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return {
    assignValue,
    dropdownRefs,
    fieldValidation,
    formikRef,
    handleCreateThread,
    handleGenerateContent,
    handleGenerateTags,
    handleImagePick,
    initialValues,
    inputRefs,
    styles,
  }
}

export default useAdd
