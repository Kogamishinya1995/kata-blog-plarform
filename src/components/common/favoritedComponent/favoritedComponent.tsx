import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../slices";
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  articlesApi,
} from "../../../slices/articlesApi";
import { Article } from "../../../types";
import { customStyles } from "../../../utils/modalStyle";

const FavoritedComponent = ({ article }: { article: Article }) => {
  const [favouriteArticle] = useFavoriteArticleMutation();
  const [unfavouriteArticle] = useUnfavoriteArticleMutation();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const [loading, setLoading] = useState(false);

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    await favouriteArticle({ slug: article.slug });
    dispatch(articlesApi.util.invalidateTags(["Articles", "Article"]));
    setLoading(false);
  };

  const handleUnfavoriteClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    await unfavouriteArticle({ slug: article.slug });
    dispatch(articlesApi.util.invalidateTags(["Articles", "Article"]));
    setLoading(false);
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <span className="favorited-component">
      {article.favorited ? (
        <FaHeart
          style={{ color: "red" }}
          onClick={loading ? undefined : handleUnfavoriteClick}
        />
      ) : (
        <FaRegHeart
          onClick={
            loading ? undefined : token ? handleFavoriteClick : openModal
          }
        />
      )}{" "}
      {article.favoritesCount}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="single-article-modal">
          Ставить лайки могут только авторизованные пользователи
          <div className="favourite-modal">
            <Link to="/sign-in">
              <Button variant="btn btn-outline-success">Авторизоваться</Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="btn btn-outline-success">
                Зарегестрироваться
              </Button>
            </Link>
            <Button variant="btn btn-outline-success" onClick={closeModal}>
              Закрыть окно
            </Button>
          </div>
        </div>
      </Modal>
    </span>
  );
};

export default FavoritedComponent;
