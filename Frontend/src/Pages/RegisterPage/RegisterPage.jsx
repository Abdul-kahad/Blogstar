import { useState } from 'react';
import axios from 'axios';
import classes from './RegisterPage.module.css';
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [serverMsg, setServerMsg] = useState("")

  const registerHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://blogstar-195v.onrender.com/api/register", formData)

      console.log("Server Response:", response.data)
      console.log("Message:", response.data.message)
      console.log("User:", response.data.user)

      // Save message to state so the UI can show it
      setServerMsg(response.data.message)

      setFormData({
        username: '',
        email: '',
        password: ''
      });

    } catch (error) {
      console.log("Error:", error.response?.data || error.message)

      // Show error message to UI
      setServerMsg(error.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <div className={classes.BODY}>
      <form className={classes.Signup} onSubmit={registerHandler}>
        {/* Display server message */}
        {serverMsg && <p>{serverMsg}</p>}

        <h2>Register</h2>
        <hr />

        <input type="text" placeholder="Name"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          value={formData.username}
        />

        <input type="email" placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />

        <input type="password" placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
        />

        <button className={classes.Signupbtn}>Register</button>

        <small>Already have an account?
          <Link to={'/login'}> Login</Link>
        </small>
      </form>
    </div>

  );
}

export default RegisterPage

{/* <p>{response?.data?.message?.message}</p> */}