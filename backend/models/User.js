const { model, Schema } = require('mongoose')

const userSchema = new Schema(
  {
    lastname: {
      type: String,
    },
    firstname: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['monsieur', 'madame'],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isManager: {
      type: Boolean,
      default: false,
    },
    isModerator: {
      type: Boolean,
      default: false,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    childrenClasses: [
      {
        type: Schema.ObjectId,
        ref: 'Classes',
      },
    ],
    password: {
      type: String,
      required: true,
    },

    roles: [
      {
        type: Schema.ObjectId,
        ref: 'Role',
      },
    ],
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
