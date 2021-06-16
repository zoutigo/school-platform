const { model, Schema } = require('mongoose')

const eventSchema = new Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 100,
      required: true,
    },
    text: {
      type: String,
      min: 10,
      max: 30000,
    },
    place: {
      type: String,
      min: 4,
      max: 100,
      default: 'Ecole Saint Augustin',
    },
    date: {
      type: Number,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
)

module.exports = model('Event', eventSchema)
