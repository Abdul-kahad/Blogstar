import React from "react";
import classes from './Auth.module.css'
import { Link } from "react-router-dom";

const Auth = () => {
  return(
    <p className={classes.Login}>
      <Link to={'/login'}>Login</Link>
    </p>
  )
}

export default Auth