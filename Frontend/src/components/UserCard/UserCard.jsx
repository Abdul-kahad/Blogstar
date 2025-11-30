 import classes from './UserCard.module.css'
 import profile from '../../assets/KGL.png'

 const UserCard = (props) => {
  return(
    <>
      <div className={classes.User}>
        <img className={classes.Profile} src={profile} alt="userImg" />
        <div className={classes.Userinfo}>
          <h3><strong>Username: </strong>{props.username}</h3>
          <p><strong>User_ID: </strong>{props.uid}</p>
          <p><strong>No_Posts: </strong>{props.posts}</p>
          <button className={classes.Suspend} onClick={props.suspend}>Suspend User</button>
          <button className={classes.Delete} onClick={props.delete}>Delete User</button>
        </div>
      </div>
    </>
  );
 }
 export default UserCard