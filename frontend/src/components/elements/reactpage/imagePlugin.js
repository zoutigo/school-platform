/* eslint-disable no-new */
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import image from '@react-page/plugins-image'
import { apiPostImage } from '../../../utils/api'

const imagePlugin = () => {
  const { URL_PREFIX } = useSelector((state) => state.settings)
  const { Token } = useSelector((state) => state.user)

  const uploadImage = useCallback(
    () => async (file, reportProgress) => {
      const data = await apiPostImage({ file, Token })
      return { url: data.url }
    },
    []
  )

  return image({
    imageUpload: uploadImage(),
  })
}

// const UploadImage = () => {
//   const [compressedFile, setCompressedFile] = useState(null)
//   const { Token } = useSelector((state) => state.user)

//   const handleCompressedUpload = (file) => {
//     new Compressor(file, {
//       quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
//       success: async (compressedResult) => {
//         // compressedResult has the compressed file.
//         // Use the compressed file to upload the images to your server.
//         const { url } = await apiPostImage({ compressedResult, Token })
//         setCompressedFile(url)
//       },
//     })
//   }

//   return image({
//     imageUpload: handleCompressedUpload(),
//   })
// }

export default React.memo(imagePlugin)
