import uniqueId from "lodash/uniqueId";
import { Article } from "../../../../types";
import formatDate from "../../../../utils/formatDate";
import shortenDescription from "../../../../utils/shortenDescription";

const ArticlePreview = (article: Article) => (
  <div className="article-preview">
    <div className="article-preview__content">
      <div className="article-preview__title">
        <h4>{article.title}</h4>
        <p className="article-preview__likes">♡ {article.favoritesCount}</p>
      </div>
      <div className="article-preview__tags">
      {article.tagList?.length ? (
    article.tagList.map((item) => (
      <p key={uniqueId("tag_")}>{item}</p>
    ))
  ) : (
    <p>#безтегов</p>
  )}
      </div>
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

export default ArticlePreview;
