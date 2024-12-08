import { uniqueId } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAnArticleQuery } from "../../../slices/articlesApi";
import formatDate from "../../../utils/formatDate";
import ReactMarkdown from "react-markdown";
import { Button } from "react-bootstrap";

const SingleArticle = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useGetAnArticleQuery(slug);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="single-article-container">
      {isLoading && <p>загрузка статьи...</p>}
      {error && <p>Ошибка при загрузке статьи</p>}
      {data ? (
        <div className="single-article">
          <div className="single-article-header">
            <div className="single-article-header__content">
              <div className="single-article-title">
                <h5>{data.article.title}</h5>
                <p className="single-article-likes">
                  ♡ {data.article.favoritesCount}
                </p>
              </div>
              <div className="article-preview__tags">
              {data.article.tagList?.length ? (
    data.article.tagList.map((item: string) => (
      <p key={uniqueId("tag_")}>{item}</p>
    ))
  ) : (
    <p>#безтегов</p>
  )}
              </div>
              <div className="single-article-description">
                {data.article.description}
              </div>
            </div>
            <div className="single-article__author-info">
              <div className="single-article-preview__create-info">
                <p className="single-article-preview__author-name">{data.article.author.username}</p>
                <p>{formatDate(data.article.createdAt)}</p>
              </div>
              <img
                className="article-preview__avatar"
                src={data.article.author.image}
                alt=""
              />
            </div>
          </div>
          <div className="single-article-body">
          <ReactMarkdown>{data.article.body}</ReactMarkdown>
          </div>
          <button onClick={goBack} type="button" className="btn btn-primary btn-lg" style={{ width: '15vw', marginLeft: 'auto', marginRight: 'auto', marginTop: '5vh' }}>Вернуться назад</button>
        </div>
      ) : (
        !isLoading && (
          <p>
            Ошибка при загрузке статьи: статья с указанным адресом не найдена
          </p>
        )
      )}
    </div>
  );
};

export default SingleArticle;
