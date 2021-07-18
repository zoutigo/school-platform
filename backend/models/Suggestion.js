const { model, Schema } = require('mongoose')

const suggestionSchema = new Schema(
  {
    topic: {
      type: String,
      enum: ['bug', 'idea', 'improvment', 'other'],
      required: true,
    },
    title: {
      type: String,
      min: 3,
      max: 100,
      required: true,
    },
    message: {
      type: String,
      required: true,
      min: 3,
      max: 1000,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'read', 'answered'],
      default: 'open',
    },
  },
  { timestamps: true }
)

module.exports = model('Suggestion', suggestionSchema)
