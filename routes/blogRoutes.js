const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const upload = require('../middleware/upload');
const { createBlog, getUserBlogs } = require('../controllers/blogController');

router.post('/', auth, upload.single('blog_image'), createBlog);
router.get('/', auth, getUserBlogs);

module.exports = router;