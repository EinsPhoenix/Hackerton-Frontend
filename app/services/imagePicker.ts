import * as ImagePicker from 'expo-image-picker'

import { showErrorToast } from 'app/utils'

/**
 * Function to pick an image from the device's library or camera.
 * @returns {Promise<string | null>} - Returns the image URI if successful, null otherwise.
 */
export const pickImage = async (): Promise<string | null> => {
  // Request permissions for accessing the camera and media library
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

  if (!permissionResult.granted) {
    showErrorToast('error.permission.pickPhoto')
    return null
  }

  // Launch the image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  })

  // Check if the user canceled the picker
  if (result.canceled) {
    return null
  }

  // Return the selected image URI
  return result.assets[0].uri
}

/**
 * Function to take a photo using the camera.
 * @returns {Promise<string | null>} - Returns the image URI if successful, null otherwise.
 */
export const takePhoto = async (): Promise<string | null> => {
  // Request permissions for using the camera
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

  if (!permissionResult.granted) {
    showErrorToast('error.permission.takePhoto')
    return null
  }

  // Launch the camera
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  })

  // Check if the user canceled the camera
  if (result.canceled) {
    return null
  }

  // Return the captured image URI
  return result.assets[0].uri
}
