import { useState } from "react";
import Button from "react-bootstrap/Button";
import ReactMarkdown from "react-markdown";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  articlesApi,
  useGetAnArticleQuery,
  useDeleteArticleMutation,
} from "../../../slices/articlesApi";
import AuthorComponent from "../../common/authorComponent/authorComponent";
import FavoritedComponent from "../../common/favoritedComponent/favoritedComponent";
import TagsComponent from "../../common/tagsComponent/tagsComponent";
import { RootState } from "../../../slices";
import NotFoundPage from "../notFoundPage/notFoundPage";

const SingleArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetAnArticleQuery(slug || "");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/articles");
    dispatch(articlesApi.util.invalidateTags(["Articles"]));
  };

  const user = useSelector((state: RootState) => state.auth.username);
  const token = useSelector((state: RootState) => state.auth.token);
  const [deleteArticle] = useDeleteArticleMutation();

  const handleDelete = () => {
    deleteArticle({ token, slug });
    navigate("/articles");
    dispatch(articlesApi.util.invalidateTags(["Articles"]));
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="single-article-container">
      {isLoading && <p>загрузка статьи...</p>}
      {error && <p>Ошибка при загрузке статьи</p>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="single-article-modal">
          Вы действительно хотите удалить статью?
          <Button variant="btn btn-outline-danger" onClick={handleDelete}>
            Удалить статью
          </Button>
        </div>
      </Modal>
      {data ? (
        <div className="single-article">
          <div className="single-article-header">
            <div className="single-article-header__content">
              <div className="single-article-title">
                <h5>{data.article.title}</h5>
                <FavoritedComponent article={data.article} />
              </div>
              <TagsComponent article={data.article} />
              <div className="single-article-description">
                {data.article.description}
              </div>
            </div>
            <div className="single-article__author-container">
              <AuthorComponent article={data.article} />
              <div>
                {user === data.article.author.username ? (
                  <div className="single-article-edit-button">
                    {" "}
                    <Button
                      variant="btn btn-outline-success"
                      onClick={() =>
                        navigate(`/articles/${slug}/edit`, {
                          state: {
                            title: data.article.title,
                            description: data.article.description,
                            text: data.article.body,
                            tags: data.article.tagList,
                            slug: data.article.slug,
                          },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="btn btn-outline-danger"
                      onClick={openModal}
                    >
                      Delete
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="single-article-body">
            <ReactMarkdown>{data.article.body}</ReactMarkdown>
          </div>
          <button
            onClick={goBack}
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              width: "15vw",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "5vh",
            }}
          >
            Вернуться назад
          </button>
        </div>
      ) : (
        !isLoading && (
          <NotFoundPage />
        )
      )}
    </div>
  );
};

export default SingleArticle;
