import uniqueId from "lodash/uniqueId";
import { Article } from "../../../../types";
import formatDate from "../../../../utils/formatDate";
import shortenDescription from "../../../../utils/shortenDescription";
import FavoritedComponent from "../../../common/favoritedComponent/favoritedComponent";
import TagsComponent from "../../../common/tagsComponent/tagsComponent";

const ArticlePreview = (article: Article) => {


  return (
    <div className="article-preview">
      <div className="article-preview__content">
        <div className="article-preview__title">
          <h4>{article.title}</h4>
          <FavoritedComponent article={article} />
        </div>
        <TagsComponent article={article} />
        <div className="article-preview__text">
          {shortenDescription(article.description)}
        </div>
      </div>
      <div className="article-preview__author-info">
        <div className="article-preview__create-info">
          <p>{article.author.username}</p>
          <p>{formatDate(article.createdAt)}</p>
        </div>
        <img
          className="article-preview__avatar"
          src={article.author.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default ArticlePreview;
