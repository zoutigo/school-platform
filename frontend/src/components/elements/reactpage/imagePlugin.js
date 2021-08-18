import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import image from '@react-page/plugins-image'
import { apiPostImage } from '../../../utils/api'

const imagePlugin = () => {
  const { URL_PREFIX } = useSelector((state) => state.settings)
  const { Token } = useSelector((state) => state.user)

  //   function uploadImage() {
  //     return function (file, reportProgress) {
  //       return new Promise((resolve) => {
  //         const { url } = apiPostImage({ file, Token })
  //         resolve({ url: url })
  //       })
  //     }
  //   }

  const uploadImage = useCallback(
    () => (file, reportProgress) =>
      new Promise((resolve) => {
        const { url } = apiPostImage({ file, Token })
        resolve({ url: url })
      }),
    []
  )

  return image({
    imageUpload: uploadImage(),
  })
}

export default React.memo(imagePlugin)
