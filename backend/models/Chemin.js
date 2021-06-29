const { model, Schema } = require('mongoose')

const cheminSchema = new Schema(
  {
    alias: {
      type: String,
      required: true,
      max: 100,
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
    path: {
      type: String,
      required: true,
      max: 100,
    },
    description: {
      type: String,
      required: true,
      max: 200,
    },
  },
  { timestamps: true }
)

module.exports = model('Chemin', cheminSchema)
