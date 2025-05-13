const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 
const { createBlog,getBlogList,comments ,replyComment} = require('../controllers/blogController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists in your project root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension to file name
  }
});

const upload = multer({ storage });

router.post('/createBlog', upload.single('blog_image'), createBlog);
router.get('/getBlogList',getBlogList)
router.post('/comments',comments)
router.post('/comments/reply',replyComment)
module.exports = router;
