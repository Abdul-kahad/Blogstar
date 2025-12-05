import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Body.module.css";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [blogs, setBlogs] = useState([]);
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://blogstar-195v.onrender.com/');
        setBlogs(response.data);
        setServerMsg(response.data.message);
      } catch (error) {
        console.log("Error", error.response?.data || error.message);
        setServerMsg( error.response?.data?.message || "Something went wrong failed to get blogs");
      }
    };
    fetchBlogs();
  }, []);

  const deletePostHandler = async (blogId) => {
  try {
    const response = await axios.delete(`https://blogstar-195v.onrender.com/api/me/post/${blogId}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setServerMsg(response.data.message)
    navigate('/') 
    alert(JSON.stringify(serverMsg))
  } catch (error) {
    console.log(error.response?.data || error.message)
    setServerMsg(error.response?.data?.message ?? 'Somthing went wrong, Failed to delete post')
  }
}

  return (
    <div className={classes.Body}>
      {serverMsg && <p>{serverMsg}</p>}

      {blogs.map((blog) => (
        <Card
          key={blog._id}
          updateBlog={() => navigate(`/me/updateblog/${blog._id}`)}  
          delete = {() => deletePostHandler(blog._id)}
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
          })}
        />
      ))}

        <button 
          className={classes.AddPost} 
          onClick={() => navigate('/me/createBlog')}
          >+Post</button>
    </div>
  );
};

export default Body;
