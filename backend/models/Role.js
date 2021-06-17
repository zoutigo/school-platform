const { model, Schema } = require('mongoose')

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    mission: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    entity: {
      type: Schema.ObjectId,
      ref: 'Entity',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = model('Role', roleSchema)
