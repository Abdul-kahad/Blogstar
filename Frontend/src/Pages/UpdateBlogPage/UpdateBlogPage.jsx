import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card/Card.jsx";
import axios from "axios";
import classes from './UpdateBlogPage.module.css';

const UpdateBlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", body: "" });
  const [blog, setBlog] = useState(null);
  const [serverMSG, setServerMSG] = useState("");

  // FETCH BLOG DATA ON PAGE LOAD
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://blogstar-195v.onrender.com/api/me/post/${blogId}`,{
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const foundBlog = response.data;
        setBlog(foundBlog);

        // 💡 PRE-POPULATE THE INPUT FIELDS
        setFormData({
          title: foundBlog.title,
          body: foundBlog.body,
        });
        console.log("blogId from URL:", blogId);
        console.log("response from backend:", response.data);

      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchBlog();
  }, [blogId]);

  const updateblogHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://blogstar-195v.onrender.com/api/me/post/${blogId}`,formData,{
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      navigate("/blogstar");
      alert(response.data.message);

    } catch (error) {
      console.log(error.response?.data || error.message);
      setServerMSG(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className={classes.UpdateBlogPage}>
      <Card
        title={blog.title}
        body={blog.body}
        author={blog.author}
        date={blog.createdAt}
        delete
      />

      <form className={classes.Form} onSubmit={updateblogHandler}>
        <h2>Update Blog Post</h2>
        <hr />

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>setFormData({ ...formData, title: e.target.value })}
        />

        <textarea
          placeholder="What's on your mind..."
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />
        <button>UPDATE</button>
      </form>
    </div>
  );
};

export default UpdateBlogPage;
