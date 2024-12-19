import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const NotFoundPage  = () => {
return (
    <div className="not-found-page">
        <h1>Данная страница не существует</h1>
        <img src="https://static-00.iconduck.com/assets.00/9-404-error-illustration-1024x454-1e9ol1ls.png" alt="" />
        <Link to="/">
        <Button variant="btn btn-outline-primary btn-lg">Вернуться на домашнюю страницу</Button>
      </Link>
    </div>
)
};

export default NotFoundPage;