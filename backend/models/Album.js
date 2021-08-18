const { model, Schema } = require('mongoose')

const albumSchema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 30,
      required: true,
    },
    alias: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 3,
      max: 200,
    },
    entity: {
      type: Schema.Types.ObjectId,
      ref: 'Entity',
      required: true,
    },
    coverpath: {
      type: String,
      required: true,
      max: 100,
    },
    covername: {
      type: String,
      required: true,
      max: 100,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
    pictures: [
      {
        filename: {
          type: String,
          required: true,
          max: 100,
        },
        filepath: {
          type: String,
          required: true,
          max: 100,
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = model('Album', albumSchema)
