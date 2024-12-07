import { Routes, Route } from "react-router-dom";
import ArticleList from "./articlesLIst/articlesLIst";
import SingleArticle from "./singleArticle/singleArticle";

const MainComponent = () => (
  <main className="main">
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:slug" element={<SingleArticle />} />
    </Routes>
  </main>
);

export default MainComponent;
