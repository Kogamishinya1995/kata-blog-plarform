import { Article } from '../../../types';
import uniqueId from "lodash/uniqueId";

function shortenDescription(str: string): string {
    return str.length > 50
      ? `${str
          .split(" ")
          .filter((_, index) => index <= 50)
          .join(" ")}...`
      : str;
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  

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
        {shortenDescription(article.body)}
        </div>
      </div>
      <div className='article-preview__author-info'>
        <div className='article-preview__create-info'>
        <p>{article.author.username}</p>
        <p>{formatDate(article.createdAt)}</p>
        </div>
        <img className='article-preview__avatar' src={article.author.image} alt="" />
      </div>
    </div>
  );
};

export default ArticlePreview;