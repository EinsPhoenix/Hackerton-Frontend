import React, { useEffect, useRef, useState } from 'react'

import { FormikProps } from 'formik'
import * as yup from 'yup'

import { CustomDropdownRef } from 'app/components'
import { CustomTextInputRef } from 'app/components/Input/TextField.type'
import { useAppContext } from 'app/context'
import { translate } from 'app/i18n'
import { ScreenTypes } from 'app/navigators'
import { AddThreadParams } from 'app/services'
import { logger, shortenText, showErrorToast, showSuccessToast, useHeader } from 'app/utils'

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

  const [image, setImage] = useState<string | null>(null)
  const formikRef = useRef<FormikProps<AddThreadParams>>(null)
  const inputRefs = useRef({
    content: React.createRef<CustomTextInputRef>(),
    content_summary: React.createRef<CustomTextInputRef>(),
    titel: React.createRef<CustomTextInputRef>(),
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
    content: yup.string().trim().required(translate('validation.content.required')!),
    content_summary: yup.string().trim().required(translate('validation.contentSummary.required')!),
    main_tag: yup.string().required(),
    subtags: yup.array().min(1),
    titel: yup.string().trim().required(translate('validation.titel.required')!),
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
    logger.log(values)
    const success = await postThread(values)

    if (success) {
      formikRef.current?.resetForm()
      inputRefs.current.content.current?.reset()
      inputRefs.current.content_summary.current?.reset()
      dropdownRefs.current.main_tag.current?.setSelectedItems([])
      dropdownRefs.current.subtags.current?.setSelectedItems([])
      inputRefs.current.titel.current?.reset()
      setImage(null)

      showSuccessToast('success.threadAdd', undefined, {
        threadTitle: shortenText(values.titel, 20),
      })
    }
  }

  const assignValue = (field: keyof typeof initialValues) => async (value: any) => {
    if (formikRef.current?.values) {
      await formikRef.current.setFieldValue(field, value, true)
    }
  }

  const handleImagePick = async () => {
    const uri = await pickImage()
    setImage(uri)
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
    const mappedSubTags = generatedTags?.tags.SubTags.map((subtag: any, index) => {
      return subtag['SubTag' + (index + 1)]
    })

    dropdownRefs.current.main_tag.current?.setSelectedItems([
      generatedTags?.tags.MainTag.MainTag,
    ] as string[])
    dropdownRefs.current.subtags.current?.setSelectedItems(mappedSubTags)
    generatedTags?.tags.MainTag.MainTag !== 'None' &&
      (await assignValue('main_tag')(generatedTags?.tags.MainTag.MainTag))
    !mappedSubTags?.some(item => item === 'None') && (await assignValue('subtags')(mappedSubTags))

    if (
      generatedTags?.tags.MainTag.MainTag === 'None' ||
      mappedSubTags?.some(item => item === 'None')
    ) {
      showErrorToast('error.ai.tags')
    }
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
    image,
    initialValues,
    inputRefs,
    styles,
  }
}

export default useAdd
