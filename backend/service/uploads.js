const AWS = require('aws-sdk')
const dotenv = require('dotenv')

dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

/**
 * upload file to aws s3
 * @param {*} file
 */
async function uploadFileToAws(file) {
  const fileName = `${new Date().getTime()}_${file.name}`
  // eslint-disable-next-line prefer-destructuring
  const mimetype = file.mimetype
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.data,
    ContentType: mimetype,
    ACL: 'public-read',
  }
  const res = await new Promise((resolve, reject) => {
    s3.upload(params, (err, data) =>
      err == null ? resolve(data) : reject(err)
    )
  })
  return { fileUrl: res.Location, filename: file.name }
}

module.exports = {
  uploadFileToAws,
}
