import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileButtons from "./profileButtons/profileButtons";
import SignButtons from "./signButtons/signButtons";
import { RootState } from "../../slices";

const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <div className="header-container">
      <div className="header">
        <Link className="title-link" to="/">
          <h1>RealWorld Blog</h1>
        </Link>
        {token ? <ProfileButtons /> : <SignButtons />}
      </div>
    </div>
  );
};

export default Header;
