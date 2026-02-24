import Search from "../../components/Search/Search";
import Body from "../../containers/Body/Body";
import classes from "./Homepage.module.css";

const Homepage = () => {
  return(
    <div className={classes.homepage}>
      <Search />
      <Body />
    </div>
  )
}

export default Homepage