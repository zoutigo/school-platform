const { model, Schema } = require('mongoose')

const pageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    alias: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    text: {
      type: String,
      required: true,
      maxlength: 50000,
      minlength: 3,
    },
  },
  { timestamps: true }
)

module.exports = model('Page', pageSchema)
