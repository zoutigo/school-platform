export const FILE_MAX_SIZE = 1024 * 1024
export const IMAGE_MAX_SIZE = 1024 * 1024

export const testFileSize = (value, MAX_MEGA = 10) => {
  if (!value || !value.length) return false

  return value[0].size <= FILE_MAX_SIZE * MAX_MEGA
}
export const testImageSize = (value, MAX_MEGA = 10) => {
  if (!value || !value.length) return false
  return value[0].size <= IMAGE_MAX_SIZE * MAX_MEGA
}
