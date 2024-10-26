import React from 'react'
import { ScrollView } from 'react-native'

import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'

import { Button, Field, Screen } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useAdd from './useAdd'

export const AddScreen: React.FC<SubStackScreenProps<ScreenTypes.ADD>> = observer(function Add(
  _props,
) {
  const { fieldValidation, handleCreateThread, initialValues, styles } = useAdd()
  useRenderCount('AddScreen')

  return (
    <Screen style={styles.container} preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <Formik
        initialValues={initialValues}
        validationSchema={fieldValidation}
        onSubmit={handleCreateThread}>
        {({ submitForm }) => (
          <>
            <ScrollView
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <Field
                style={styles.input}
                variant="outlined"
                name="titel"
                placeholderTx="screen.add.placeholder.title"
                labelTx="screen.add.label.title"
              />
              <Field
                style={styles.input}
                variant="outlined"
                name="content"
                placeholderTx="screen.add.placeholder.content"
                labelTx="screen.add.label.content"
                multiline
              />
              <Field
                style={styles.input}
                variant="outlined"
                name="content_summary"
                placeholderTx="screen.add.placeholder.contentSummary"
                labelTx="screen.add.label.contentSummary"
                multiline
              />
            </ScrollView>
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
