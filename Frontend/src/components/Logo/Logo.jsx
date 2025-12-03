import React from "react";
import classes from './Logo.module.css';
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate()
  return(
    <span>
      <h2 
        className={classes.Logo}
        onClick={() => navigate('/Blogstar') }
        >Blogstar</h2>
    </span>
  )
}

export default Logo