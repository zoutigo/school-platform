const { model, Schema } = require('mongoose')

const entitySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      default: 'parent',
      minlength: 3,
      maxlength: 30,
    },
    alias: {
      type: String,
      unique: true,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    summary: {
      type: String,
      minlength: 10,
      maxlength: 1000,
      default: '',
    },
    image: {
      type: String,
      max: 2000000,
    },
    email: {
      type: String,
      maxlength: 50,
      minlength: 3,
      default: 'saint-augustin@gmail.com',
    },
  },
  { timestamps: true }
)

module.exports = model('Entity', entitySchema)
