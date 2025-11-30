import React from "react";
import classes from './Search.module.css';

const Search = () => {
  return(
    <section className={classes.Search}>
      <label>
        <input type="text" placeholder="Search for Blogs "  className={classes.Input}/>
        <button className={classes.SearchBtn}>Search</button>
      </label>
    </section>
  )
}

export default Search