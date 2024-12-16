import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  articlesApi,
} from "../../../slices/articlesApi";
import { Article } from "../../../types";

const FavoritedComponent = ({ article }: { article: Article }) => {
  const [favouriteArticle] = useFavoriteArticleMutation();
  const [unfavouriteArticle] = useUnfavoriteArticleMutation();
  const dispatch = useDispatch();

  return (
    <span className="favorited-component">
      {article.favorited ? (
        <FaHeart
          style={{ color: "red" }}
          onClick={async (event) => {
            event.preventDefault();
            await unfavouriteArticle({ slug: article.slug });
            dispatch(articlesApi.util.invalidateTags(["Articles", "Article"]));
          }}
        />
      ) : (
        <FaRegHeart
          onClick={async (event) => {
            event.preventDefault();
            await favouriteArticle({ slug: article.slug });
            dispatch(articlesApi.util.invalidateTags(["Articles", "Article"]));
          }}
        />
      )}{" "}
      {article.favoritesCount}
    </span>
  );
};

export default FavoritedComponent;
