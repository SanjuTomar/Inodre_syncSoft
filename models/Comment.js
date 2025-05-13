const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    blog_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Blog',
    required: true
  },
  parentCommentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Comment',
    default: null 
  },
  content: { 
    type: String, 
    required: true,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Optional, if you track user info
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  isDeleted: { // For optional soft delete
    type: Boolean,
    default: false
  }
});

// Optional virtual field for nested replies (not saved in DB)
commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentCommentId',
  justOne: false
});

// Ensure virtuals are serialized (e.g., for JSON output)
commentSchema.set('toObject', { virtuals: true });
commentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Comment', commentSchema);
