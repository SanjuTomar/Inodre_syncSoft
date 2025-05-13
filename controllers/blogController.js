const Blog = require('../models/Blog');
const Comment = require('../models/Comment')
const createBlog = async (req, res) => {
  try {
    
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, content, category_name } = req.body;
      const blog_image_url = req.file ? `/uploads/${req.file.filename}` : ''
    const blog = new Blog({
      title,
      blog_image_url,
      content,
      category_name,
    });

    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    console.error("Error creating blog:", error); 
    res.status(400).send({ error: error.message });
  }
};

const getBlogList = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    
    if (!blogs || blogs.length === 0) {
      return res.status(404).send({ error: 'No blogs found.' });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blog list:', error);
    res.status(500).send({ error: 'Failed to retrieve blog list. Please try again later.' });
  }
};

const comments = async (req, res) => {
  const { blog_id, content } = req.body;

  if (!blog_id || !content) {
    return res.status(400).send({ error: 'Blog ID and content are required.' });
  }

  const comment = new Comment({ blog_id, content, parentCommentId: null });

  try {
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error saving comment:', error);

    res.status(400).send({ error: 'Failed to save comment. Please try again.' });
  }
};


const replyComment = async (req, res) => {
  const { blog_id, commentId, content } = req.body;

  if (!blog_id) {
    return res.status(400).send({ error: '`blog_id` is required for a reply.' });
  }
  if (!commentId) {
    return res.status(400).send({ error: '`commentId` (parent comment ID) is required for a reply.' });
  }
  if (!content || !content.trim()) {
    return res.status(400).send({ error: 'Reply content cannot be empty.' });
  }

  const reply = new Comment({
    blog_id,
    content: content.trim(),
    parentCommentId: commentId
  });

  try {
    await reply.save();
    res.status(201).json(reply);
  } catch (error) {
    console.error('Error saving reply comment:', error);
    res.status(400).send({ error: 'Failed to save reply comment. Please try again.' });
  }
};



module.exports = { createBlog, getBlogList ,replyComment,comments};
