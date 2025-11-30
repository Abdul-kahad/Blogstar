import { useState, useEffect } from 'react';
import axios from 'axios'
import classes from './Profile.module.css'
import profile from '../../assets/KGL.png'
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';

 const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [bio, setBio] = useState('User bio')
  const [userBlogs, setUserBlogs] = useState([])
  const [serverMSG, setServerMSG] = useState('')

  useEffect(()=>{
    const getProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get('https://blogstar-195v.onrender.com/api/me/profile',{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setUser(storedUser)
          setUserBlogs(response.data)
        console.log('Profile Data:', response.data)
        console.log('User Data from localStorage:', storedUser)
      } catch (error) {
        console.log(error.response?.data || 'Something went wrong')
        setServerMSG(error.response?.data?.message || error.message)
      }
    }

    getProfile()
  },[])

  const deletePostHandler = async (blogId) => {
  try {
    const response = await axios.delete(`https://blogstar-195v.onrender.com/api/me/post/${blogId}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setServerMSG(response.data.message)
    navigate('/')
    alert(JSON.stringify(serverMSG))
  } catch (error) {
    console.log(error.response?.data || error.message)
    setServerMSG(error.response?.data?.message || 'Somthing went wrong, Failed to delete post')
  }
}

  return(
    <>
    <section className={classes.BlogerProfile}>
      <img className={classes.CoverPhoto} src={profile} alt="CoverPhoto"/>
      <img className={classes.Profile} src={profile} alt='profile'/>
      <article>
        <h2>{user.username}</h2>
        <p>User ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <p>{bio}</p>
        <button className={classes.createPostbtn} onClick={() => navigate('/me/createblog')}>Create Post</button>
        <button className={classes.createPostbtn} onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
      </article>
    </section>
    <section className={classes.BlogerPosts}>
      <h3>My Blog Posts</h3>
      {serverMSG ?( <h1>{serverMSG}</h1>) :  
        (<div className={classes.PrivatePosts}>
          {userBlogs.map(blog => (
            <Card 
              key={blog._id} 
              updateBlog={() => navigate(`/me/updateblog/${blog._id}`)}  
              delete = { () => deletePostHandler(blog._id)}
              liked
              title={blog.title}
              body={blog.body}
              author={blog.author}
              date={new Date(blog.createdAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}/>
          ))}
        </div>)}
    </section>
    </>
  );
 }
 export default Profile