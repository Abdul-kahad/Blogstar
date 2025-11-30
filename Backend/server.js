const express = require('express')
const dotenv = require('dotenv')
const mongoDB = require('./config/db')
const cors = require("cors");
const { register, login } = require('./auth/auth')
const { authenticate, authorize } = require('./middleWear/authMiddlewear')
const {about, adminDashboard, deleteUser} = require('./controllers/controllers')
const { allPosts, getSingleBlog, myProfile, createPost, updatePost, deletePost } = require('./postHandlers/postHandlers')

dotenv.config()
mongoDB()

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/api/register', register) 
app.post('/api/login', login) 
app.post('/api/createPost', authenticate, authorize(['Admin', 'User']), createPost) 
app.get('/', allPosts) 
app.get('/api/me/post/:id', authenticate, getSingleBlog); 
app.get('/api/me/profile',authenticate, myProfile) 
app.put('/api/me/post/:id',authenticate, updatePost) 
app.delete('/api/me/post/:id',authenticate, deletePost) 
app.get('/api/about', about)
app.delete('/api/deleteUser/:uid', authenticate, authorize(['Admin']), deleteUser) 
app.get('/api/admin/dashboard', authenticate, authorize(['Admin']), adminDashboard) 

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))