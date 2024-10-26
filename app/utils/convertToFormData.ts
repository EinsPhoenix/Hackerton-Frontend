export const convertToFormData = (params: Record<string, any>): FormData => {
  const formData = new FormData()
  Object.keys(params).forEach(key => {
    formData.append(key, params[key])
  })
  return formData
}
