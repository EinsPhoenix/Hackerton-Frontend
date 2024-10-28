import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Images } from 'assets/images'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'

import { Button, Dropdown, Field, Image, Screen, Text } from 'app/components'
import { translate } from 'app/i18n'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import { PREFERENCES } from 'app/screens/Entry/WelcomeScreen/PreferencesList'
import { useRenderCount } from 'app/utils'

import useAdd from './useAdd'

export const AddScreen: React.FC<SubStackScreenProps<ScreenTypes.ADD>> = observer(function Add(
  _props,
) {
  const {
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
  } = useAdd()
  useRenderCount('AddScreen')

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="auto"
      safeAreaEdges={['top', 'bottom']}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={fieldValidation}
        onSubmit={handleCreateThread}>
        {({ submitForm }) => (
          <>
            <TouchableOpacity style={styles.space} onPress={handleImagePick}>
              <Image
                source={image || Images.PLACEHOLDER_IMAGE}
                containerStyle={styles.imgContainer}
                style={styles.img}
                contentFit="cover"
              />
            </TouchableOpacity>
            <Field
              ref={inputRefs.current.titel}
              style={styles.space}
              variant="outlined"
              name="titel"
              placeholderTx="screen.add.placeholder.title"
              labelTx="screen.add.label.title"
              onSubmitEditing={() => {
                inputRefs.current.content?.current?.focus()
              }}
            />
            <Field
              ref={inputRefs.current.content}
              style={styles.space}
              variant="outlined"
              name="content"
              placeholderTx="screen.add.placeholder.content"
              labelTx="screen.add.label.content"
              multiline
              onSubmitEditing={() => {
                inputRefs.current.content_summary?.current?.focus()
              }}
            />
            <View style={styles.summaryContainer}>
              <Field
                ref={inputRefs.current.content_summary}
                style={[styles.space, styles.summary]}
                variant="outlined"
                name="content_summary"
                placeholderTx="screen.add.placeholder.contentSummary"
                labelTx="screen.add.label.contentSummary"
                multiline
              />
              <Button
                preset="secondary"
                tx="common.generate"
                leftIcon="AI"
                onPress={handleGenerateContent}
                buttonContainerStyle={[styles.summaryButton, styles.space]}
              />
            </View>

            <View style={[styles.tagContainer, styles.space]}>
              <View style={styles.innerTagContainer}>
                <Text
                  preset="h3"
                  tx="screen.add.mainTag"
                  style={styles.fixedTextHeight}
                  numberOfLines={1}
                />
                <Dropdown
                  ref={dropdownRefs.current.main_tag}
                  items={PREFERENCES.map(preference => ({
                    key: preference.preference,
                    value: preference.preference,
                  }))}
                  onPress={assignValue('main_tag')}
                  title={translate('common.choose') + ' ...'}
                  width="100%"
                />
              </View>
              <View style={styles.innerTagContainer}>
                <View style={styles.fixedTextHeight}>
                  <Text preset="h3" tx="screen.add.subTags" numberOfLines={1} />
                  <Text preset="small" tx="screen.add.subTagInfo" numberOfLines={2} />
                </View>
                <Dropdown
                  ref={dropdownRefs.current.subtags}
                  multiSelect
                  items={PREFERENCES.map(preference => ({
                    key: preference.preference,
                    value: preference.preference,
                  }))}
                  onPress={assignValue('subtags')}
                  title={translate('common.choose') + ' ...'}
                  width="100%"
                />
              </View>
              <View style={styles.innerTagContainer}>
                <Text
                  preset="h3"
                  tx="screen.add.subTagsAI"
                  style={styles.fixedTextHeight}
                  numberOfLines={1}
                />
                <Button
                  preset="secondary"
                  leftIcon="AI"
                  tx="common.generate"
                  onPress={handleGenerateTags}
                  buttonContainerStyle={styles.generateButton}
                />
              </View>
            </View>
            <Button
              onPress={submitForm}
              preset="primary"
              tx="common.add"
              buttonContainerStyle={styles.button}
            />
          </>
        )}
      </Formik>
    </Screen>
  )
})
