const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Every post should have a title ...'],
    },
    body: {
      type: String,
      required: [
        true,
        'Call us crazy, but we think every post should have some content...',
      ],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Who wrote this?'],
    },
  },
  { timestamps: true }
)

module.exports = model('Post', postSchema)
