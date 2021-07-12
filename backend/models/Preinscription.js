const { model, Schema } = require('mongoose')

const PreinscriptionSchema = new Schema(
  {
    parent: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    classroom: {
      type: Schema.ObjectId,
      ref: 'Entity',
      required: true,
    },
    childFirstname: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    filepath: {
      type: String,
      max: 100,
    },
    filename: {
      type: String,
      max: 100,
    },
    message: {
      type: String,
      max: 1000,
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
