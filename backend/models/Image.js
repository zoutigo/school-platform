const { model, Schema } = require('mongoose')

const imageSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
      max: 200,
    },
    path: {
      type: String,
      required: true,
      max: 2000000,
    },
    // parent can be article or event or User or classroom
    author: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    alt: {
      type: String,
      min: 3,
      max: 50,
    },
  },
  { timestamps: true }
)

module.exports = model('Image', imageSchema)
