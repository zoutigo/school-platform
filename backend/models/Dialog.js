const { model, Schema } = require('mongoose')

const dialogSchema = new Schema(
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
    startdate: {
      type: Number,
      required: true,
    },
    enddate: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
)

module.exports = model('Dialog', dialogSchema)
