import { useState, useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { Link, useSearchParams } from "react-router-dom";
import { useGetArticlesQuery } from "../../../slices/articlesApi";
import { Article } from "../../../types";
import ArticlePreview from "../articlesLIst/articlePreview/articlePreview";

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const articlesPerPage = 20;
  const offset = (currentPage - 1) * articlesPerPage;

  const { data, error, isLoading } = useGetArticlesQuery({ offset });

  const totalArticles = data?.articlesCount || 0;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, setSearchParams]);

  return (
    <div className="articles-list">
      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка при загрузке статей</p>}
      {data ? (
        data.articles.length > 0 ? (
          data.articles.map((article: Article) => (
            <div key={article.slug} className="article-preview__container">
              <Link
                to={`/articles/${article.slug}`}
                style={{ textDecoration: "none" }}
              >
                <ArticlePreview {...article} />
              </Link>
            </div>
          ))
        ) : (
          <p>В настоящий момент нет опубликованных статей</p>
        )
      ) : (
        !isLoading && <p>В настоящий момент нет опубликованных статей</p>
      )}
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ArticleList;
