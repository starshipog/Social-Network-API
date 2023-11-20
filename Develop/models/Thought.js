const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reactionSchema',
      },
    ],
  },
  // {
  //   toJSON: {
  //     getters: true,
  //   },
  //   id: false,
  // }
);



// Create a virtual property `commentCount` that gets the amount of comments per post
postSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


module.exports = userSchema;
