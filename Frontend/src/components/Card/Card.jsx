import React from "react";
import classes from "./Card.module.css";
import BlogImg from "../../../src/assets/KGL.png";

const Card = (props) => {
  return (
    <section
      className={classes.Card}
    >
      <img src={BlogImg} alt="blogimg" className={classes.BlogImg} />
      <div className={classes.updateNdelete}>
        <div className={classes.update} onClick={props.updateBlog}>🖊</div>
        <hr />
        <div className={classes.delete} onClick={props.delete}>🗑</div>
      </div>
        <div className={classes.like} onClick={props.liked}>💙{props.likes}</div>
      <h2 className={classes.BlogTitle}>{props.title}</h2>
      <p className={classes.BlogBody}>{props.body}</p>

      <span className={classes.BlogMeta}>
        <small className={classes.Bloger}>{props.author}</small>
        <small className={classes.Blogedate}>{props.date}</small>
      </span>
    </section>
  );
};

export default Card;
