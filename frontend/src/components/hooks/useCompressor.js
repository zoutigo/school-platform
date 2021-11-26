import Compressor from 'compressorjs'
import React, { useState } from 'react'

const useCompressor = (file) => {
  const [compressedFile, setCompressedFile] = useState(null)

  // eslint-disable-next-line no-new
  new Compressor(file, {
    quality: 0.6,

    success(result) {
      setCompressedFile(result)
    },
    error(err) {
      console.log(err.message)
    },
  })

  return { compressedFile }
}

export default useCompressor
