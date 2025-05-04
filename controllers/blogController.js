const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const { title, content, category_name } = req.body;
    const blog_image_url = req.body.blog_image_url;
    
    const blog = new Blog({
      title,
      blog_image_url,
      content,
      category_name,
      author: req.user._id
    });
    
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    console.log("19--",error)
    res.status(400).send({ error: error.message });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate('category', 'name')
      .populate('author', 'name');
      
    res.send(blogs);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createBlog, getUserBlogs };