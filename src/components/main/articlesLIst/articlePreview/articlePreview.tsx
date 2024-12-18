import { Article } from "../../../../types";
import shortenDescription from "../../../../utils/shortenDescription";
import AuthorComponent from "../../../common/authorComponent/authorComponent";
import FavoritedComponent from "../../../common/favoritedComponent/favoritedComponent";
import TagsComponent from "../../../common/tagsComponent/tagsComponent";

const ArticlePreview = (article: Article) => (
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
    <AuthorComponent article={article} />
  </div>
);

export default ArticlePreview;
