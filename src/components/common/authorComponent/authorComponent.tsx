import { Article } from "../../../types";
import formatDate from "../../../utils/formatDate";

const AuthorComponent = ({ article }: { article: Article }) => (
  <div className="author-info">
    <div className="create-info">
      <p className="author-name">{article.author.username}</p>
      <p>{formatDate(article.createdAt)}</p>
    </div>
    <img className="avatar" src={article.author.image} alt="" />
  </div>
);

export default AuthorComponent;
