import { useGetArticlesQuery } from '../../../slices/articlesApi';
import { Article } from '../../../types';
import ArticlePreview from '../articlesLIst/articlePreview/articlePreview';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const { data, error, isLoading } = useGetArticlesQuery('');
  console.log('статьи', data);

  return (
    <div className="articles-list">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading articles</p>}
      {data ? (
        data.articles.length > 0 ? (
          data.articles.map((article: Article) => (
            <Link
              to={`/articles/${article.slug}`}
              key={article.slug}
              style={{ textDecoration: 'none' }}
            >
              <ArticlePreview {...article} />
            </Link>
          ))
        ) : (
          <p>No articles available</p>
        )
      ) : (
        !isLoading && <p>No articles available</p>
      )}
    </div>
  );
};

export default ArticleList;