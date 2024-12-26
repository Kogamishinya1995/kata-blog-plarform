import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../slices";

import { useGetAnArticleQuery } from "../../../slices/articlesApi";
import ArticleForm from "../../common/formComponent/formComponent";

const EditArticlePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.username);
  const { slug } = useParams();
  const { data, error, isLoading } = useGetAnArticleQuery(slug || "");

  useEffect(() => {
    if (error) {
      console.error("Ошибка при загрузке статьи:", error);
    }
  }, [error]);

  const author = data?.article.author.username;

  useEffect(() => {
    if (data && user !== author) {
      navigate(`/articles/${slug}`);
    }
  }, [data, user, author, navigate, slug]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Oval height={80} width={80} color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  const object = {
    title: data?.article.title || "",
    description: data?.article.description || "",
    text: data?.article.body || "",
    tags: data?.article.tagList || [],
    slug: slug || "",
  };

  return <ArticleForm isEditMode={true} articleData={object} />;
};

export default EditArticlePage;
