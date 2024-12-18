import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const SignButtons = () => (
  <div className="sign-buttons">
    <Link to="/sign-up">
      <Button variant="outline-info">Sign Up</Button>
    </Link>
    <Link to="/sign-in">
      <Button variant="outline-info">Sign In</Button>
    </Link>
  </div>
);

export default SignButtons;
