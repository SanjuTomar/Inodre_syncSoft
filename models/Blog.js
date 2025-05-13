const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide blog title'],
    maxlength: 100,
  },
  blog_image_url: {
    type: String,
    required: [true, 'Please provide blog image URL'],
  },
  category_name: {
    type: String,
    required: [true, 'Please provide category name'],
  },
  content: {
    type: String,
    required: [true, 'Please provide blog content'],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', BlogSchema);