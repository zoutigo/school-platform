export const FILE_MAX_SIZE = 1024 * 1024 * 5
export const IMAGE_MAX_SIZE = 1024 * 1024 * 4

export const testFileSize = (value) => {
  if (!value || !value.length) return false
  return value[0].size <= FILE_MAX_SIZE
}
export const testImageSize = (value) => {
  if (!value || !value.length) return false
  return value[0].size <= IMAGE_MAX_SIZE
}
