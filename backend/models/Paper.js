const { model, Schema } = require('mongoose')

const paperSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        'article',
        'activite',
        'parent-info',
        'newsletter',
        'menu',
        'breve',
        'info',
        'fourniture',
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },

    content: {
      type: Object,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
    entity: {
      type: Schema.Types.ObjectId,
      ref: 'Entity',
      required: true,
    },
    clientEntity: {
      type: Schema.Types.ObjectId,
      ref: 'Entity',
    },

    text: {
      type: String,
      maxlength: 200000,
    },

    date: {
      type: Number,
      default: new Date().getTime(),
    },
    startdate: {
      type: Number,
    },
    enddate: {
      type: Number,
    },
    file: {
      type: String,
    },
    filepath: {
      type: String,
      minlength: 2,
      maxlength: 150,
    },
    filename: {
      type: String,
      minlength: 2,
      maxlength: 150,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [{ type: String }],
    mediasPaths: [{ type: String }],
  },
  { timestamps: true }
)

module.exports = model('Paper', paperSchema)
