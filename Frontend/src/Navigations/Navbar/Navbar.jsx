import React from "react";
import classes from './Navbar.module.css'
import Logo from "../../components/Logo/Logo";
import Navmenu from "../../components/Navmenu/Navmenu";
import Auth from "../../components/Auth/Auth";

const Navbar = () => {
  return(
    <section className={classes.Navbar}>
      <Logo />
      <Navmenu />
      <Auth />
    </section>
  )
}

export default Navbar