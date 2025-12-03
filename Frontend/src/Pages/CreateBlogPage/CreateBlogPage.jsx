import { useState } from "react";
import classes from './CreateBlogPage.module.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlogPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [serverMSG, setServerMSG] = useState('')

  const createPostHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://blogstar-195v.onrender.com/Blogstar/api/createPost', formData, {
        headers:{
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setServerMSG(response.data.message)
      setFormData({title: '', body: ''})
      navigate('/')
      alert(JSON.stringify(serverMSG))
    } catch (error) {
      console.log(error.response?.data || error.message)
      setServerMSG(error.response?.data?.message || 'Somthing went wrong')
    }
  }
  return(
    <div className={classes.CreateBlogPage}>
      <form className={classes.Form} onSubmit={createPostHandler}>
        <h2>Create a new Blog post</h2>
        {serverMSG && <p>{serverMSG}</p>}
        <hr />
        <input 
          type="text" 
          placeholder="Blog Title" 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
          value={formData.title}
        />
        <textarea 
          placeholder="Whats on your mind..." 
          onChange={(e) => setFormData({...formData, body: e.target.value})} 
          value={formData.body}
        />
        <button>POST</button>
      </form>
    </div>
  )
}

export default CreateBlogPage