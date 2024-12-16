import uniqueId from "lodash/uniqueId";
import { Article } from "../../../../types";
import formatDate from "../../../../utils/formatDate";
import shortenDescription from "../../../../utils/shortenDescription";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from "../../../../slices/articlesApi";
import { useDispatch, UseDispatch } from "react-redux";
import { articlesApi } from "../../../../slices/articlesApi";


const ArticlePreview = (article: Article) => {
  
   const [favouriteArticle, { isLoading, error }] = useFavoriteArticleMutation();
   const [unfavouriteArticle, { Loading, err }] = useUnfavoriteArticleMutation();
   const dispatch = useDispatch();

  return (
    <div className="article-preview">
       <div className="article-preview__content">
         <div className="article-preview__title">
           <h4>{article.title}</h4>
           <span className="article-preview__likes"
           >{ article.favorited?  <FaHeart style={{ color: 'red' }} onClick={ async (event) => {
            event.preventDefault();
            await unfavouriteArticle({ slug: article.slug });
            dispatch(articlesApi.util.invalidateTags(['Articles']));
          }} /> : <FaRegHeart  onClick={ async (event) => {
             event.preventDefault();
             await favouriteArticle({ slug: article.slug });
             dispatch(articlesApi.util.invalidateTags(['Articles']));
           }} />} {article.favoritesCount}</span>
         </div>
         <div className="article-preview__tags">
           {article.tagList?.length ? (
             article.tagList.map((item) => <p key={uniqueId("tag_")}>{item}</p>)
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
} 

export default ArticlePreview;
