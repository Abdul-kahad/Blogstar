const User = require('../models/userModel')
const Blog = require('../models/blogsModel')

const allPosts = async (req, res) => {
  try {
    const blogs = await Blog.find()
    if (blogs.length === 0) return res.status(404).json({ message: 'No blog posts available' })
    res.status(200).json(blogs)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Failed to get posts'})
  }
}

const getSingleBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;

  try {
    const blog = await Blog.findOne({ _id: blogId, uid: userId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get blog" });
  }
};

const myProfile = async (req, res) => {
  const userId = req.user.id
  try {
    const userBlogs = await Blog.find({ uid: userId })
   if (userBlogs.length === 0) return res.status(404).json({ message: 'No posts found for this user' })
    res.status(200).json(userBlogs)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Failed to get post'})
  } 
}

const createPost = async (req, res) => {
  const { title, body } = req.body
  const { id, username } =req.user

  if(!title || !body) return res.status(400).json({message: 'Please enter all fields'})
  try {
      const post = await Blog.create({
        uid: id,
        title,
        body,
        author: username
      }) 
     res.status(201).json({message: 'Post created successfully'}) 

  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Failed to create post'})
  }
}

const updatePost = async (req, res) => {
  const { title, body } = req.body;
  const { id: blogId } = req.params;
  const userId = req.user.id;

  try {
    const blog = await Blog.findOne({ _id: blogId, uid: userId });

    if (!blog) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    // Safe updating
    if (title !== undefined) blog.title = title;
    if (body !== undefined) blog.body = body;

    await blog.save();

    res.status(200).json({
      message: "Post updated successfully",
      blog
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update post' });
  }
};


const deletePost = async (req, res) => {
  const blogId = req.params.id
  const userId = req.user.id
  try {
    const deleted = await Blog.deleteOne({ _id: blogId, uid: userId })
    if (deleted.deletedCount === 0) return res.status(404).json({ message: 'Post not found or unauthorized' })
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Failed to delete post', error: error.message})
  }
}

module.exports = {
  allPosts,
  getSingleBlog,
  myProfile,
  createPost,
  updatePost,
  deletePost
}