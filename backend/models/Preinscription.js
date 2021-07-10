const { model, Schema } = require('mongoose')

const PreinscriptionSchema = new Schema(
  {
    parent: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    childFirstname: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    filepath: {
      type: String,
      required: true,
      max: 100,
    },
    filename: {
      type: String,
      required: true,
      max: 100,
    },
    message: {
      type: String,
      max: 500,
    },
    status: {
      type: String,
      enum: ['etude', 'encours', 'cloturé'],
      default: 'etude',
    },
    verdict: {
      type: String,
      enum: ['ok', 'nok', 'encours'],
      default: 'encours',
    },
  },
  { timestamps: true }
)

module.exports = model('Preincription', PreinscriptionSchema)
