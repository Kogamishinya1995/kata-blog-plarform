import { useGetArticlesQuery } from '../../slices/articlesApi';
import { Routes, Route, Link } from 'react-router-dom';
import { Article } from '../../types';
import ArticlePreview from './articlePreview/articlePreview';

const MainComponent = () => {
  const { data, error, isLoading } = useGetArticlesQuery('');
  console.log(data);

  return (
    <div className="main">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading articles</p>}
      {data ? (
        data.articles.length > 0 ? (
          data.articles.map((article: Article) => (
            <Link
              to={`/article/${article.slug}`}
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

export default MainComponent;