import React from 'react'

import { Field as FormikField, FieldProps as FormikFieldProps } from 'formik'

import { LibraryTypes } from 'app/components'

import { TextField } from './TextField'
import { CustomTextInputRef, FieldProps } from './TextField.type'

export const FieldComponent = <L extends LibraryTypes, R extends LibraryTypes>(
  { ...props }: FieldProps<L, R>,
  ref?: React.Ref<CustomTextInputRef>,
) => {
  const { name } = props
  return (
    <FormikField name={name}>
      {({ form, meta }: FormikFieldProps) => {
        return (
          <TextField
            variant="standard"
            onChangeText={(text: string | React.ChangeEvent<any>) => {
              form?.handleChange(name)(text)
            }}
            onBlur={form?.handleBlur(name)}
            value={meta?.value}
            error={meta?.error && meta?.touched ? meta?.error ?? '' : ''}
            ref={ref}
            {...props}
          />
        )
      }}
    </FormikField>
  )
}

const MemorizedField = React.memo(React.forwardRef(FieldComponent))
MemorizedField.displayName = 'Field'
export { MemorizedField as Field }
