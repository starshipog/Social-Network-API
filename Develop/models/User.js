const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);



postSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


module.exports = userSchema;
