const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = model('Comment', commentSchema)
