import React from "react";
import classes from './Navmenu.module.css'
import { Link } from 'react-router-dom'

const Navmenu = () => {
  return(
    <ul className={classes.NavLists}>
      <Link to={'/'} className={classes.ListItem}>
       Home
      </Link>
      <Link to={'/profile'} className={classes.ListItem}>
       Profile
      </Link>
      <Link to={'/about'} className={classes.ListItem}>
       About
      </Link>
    </ul>
  )
}
export default Navmenu