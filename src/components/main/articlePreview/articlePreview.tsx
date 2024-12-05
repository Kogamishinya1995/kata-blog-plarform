import { Article } from '../../../types';
import uniqueId from "lodash/uniqueId";

const ArticlePreview = (article: Article) => {
  return (
    <div className='article-preview'>
      <div className='article-preview__content'>
        <div className='article-preview__title'>
        <h4>{article.title}</h4>
        <p className='article-preview__likes'>♡ {article.favoritesCount}</p>
        </div>
        <div className='article-preview__tags'>
        {article.tagList.map((item) => (
          <p key={uniqueId("tag_")}>{item}</p>
        ))}
        </div>
        <div className='article-preview__text'>
        {article.body}
        </div>
      </div>
      <div className='article-preview__author-info'>
        <div>
        <p>{article.author.username}</p>
        <p>{article.createdAt}</p>
        </div>
        <img className='article-preview__avatar' src={article.author.image} alt="" />
      </div>
    </div>
  );
};

export default ArticlePreview;