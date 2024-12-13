import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { clearAuthData } from "../../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProfileButtons = () => {

    const dispatch = useDispatch();
    const name = useSelector((state) => state.auth.username);
    const image = useSelector((state) => state.auth.image);

  return (<div className="profile-buttons">
     <Link to="/new-article">
      <Button variant="btn btn-outline-success">Create article</Button>
    </Link>
    <Link to="/profile" className="profile-buttons__edit-profile-link">
      <p className="profile-buttons__username">{name}</p>
      { image? <img src={image} alt="" /> : <img src="./defaultAvatar.png" alt="" /> }
    </Link>
    <Link to="/">
      <Button variant="outline-info" onClick={() => dispatch(clearAuthData())}>Log out</Button>
    </Link>
  </div>)
}

export default ProfileButtons;
