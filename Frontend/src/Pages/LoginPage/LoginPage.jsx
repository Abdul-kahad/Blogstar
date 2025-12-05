import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import classes from './LoginPage.module.css'
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [serverMsg, setServerMsg] = useState('')

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://blogstar-195v.onrender.com/api/login',formData)

      setServerMsg(response.data.message)
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log('Server data:',response.data)
      console.log('Mesage:',response.data.message)
      console.log('User:',response.data.user)
      console.log('Token:',response.data.token)

      setFormData({
        email: '',
        password: ''
      })
      navigate("/profile");
      alert("Login Successful");
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      setServerMsg(error.response?.data?.message || "Something went wrong");
    }
  }

  return(
    <div className={classes.BODY}>
      <form className={classes.Login} onSubmit={loginHandler}>
        {serverMsg && <p>{serverMsg}</p>}
        <h2>Login</h2>
        <hr />
        <input type="text" placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          value={formData.email}
        />

        <input type="password" placeholder="Password"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          value={formData.password}
        />

        <button className={classes.Loginbtn}>Login</button>
        <small>Don't have an account?<Link to={'/register'}> Register</Link></small>
      </form>
    </div>
  )
}

export default LoginPage