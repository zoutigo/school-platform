const { model, Schema } = require('mongoose')

const eventSchema = new Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 100,
      required: true,
    },
    content: {
      type: Object,
      required: true,
      max: 30000,
    },
    isPrivate: {
      type: Boolean,
      default: true,
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
    entity: {
      type: Schema.Types.ObjectId,
      ref: 'Entity',
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
)

module.exports = model('Event', eventSchema)
