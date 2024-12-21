import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  articlesApi,
} from "../../../slices/articlesApi";
import { Article } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../slices";
import { useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const FavoritedComponent = ({ article }: { article: Article }) => {
  const [favouriteArticle] = useFavoriteArticleMutation();
  const [unfavouriteArticle] = useUnfavoriteArticleMutation();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    await favouriteArticle({ slug: article.slug });
    dispatch(articlesApi.util.invalidateTags(["Articles", "Article"]));
  };

  const handleUnfavoriteClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    await unfavouriteArticle({ slug: article.slug });
    dispatch(articlesApi.util.invalidateTags(["Articles", "Article"]));
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

  return (
    <span className="favorited-component">
      {article.favorited ? (
        <FaHeart
          style={{ color: "red" }}
          onClick={handleUnfavoriteClick}
        />
      ) : (
        <FaRegHeart
          onClick={token ? handleFavoriteClick : openModal}
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
            <Button variant="btn btn-outline-success">Зарегестрироваться</Button>
         </Link>
          <Button variant="btn btn-outline-success" onClick={closeModal}>Закрыть окно</Button>
          </div>
        </div>
      </Modal>
    </span>
  );
};

export default FavoritedComponent;
