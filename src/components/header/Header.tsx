import SignButtons from "./signButtons/signButtons";
import ProfileButtons from "./profileButtons/profileButtons";
import { useSelector } from "react-redux";


const Header = () => {
 
  const token = useSelector((state) => state.auth.token);
 
  return (  
 <div className="header-container">
    <div className="header">
      <h1>RealWorld Blog</h1>
      { token ? <ProfileButtons /> : <SignButtons /> }
    </div>
    </div>
);
}

export default Header;
