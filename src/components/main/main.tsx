import { Routes, Route } from "react-router-dom";
import ArticleList from "./articlesLIst/articlesLIst";
import SingleArticle from "./singleArticle/singleArticle";
import SignUpPage from "./signUpPage/signUpPage";
import SignInPage from "./signInPage/signInPage";
import EditProfilePage from "./editProfilePage/editProfile";
import CreateArticlePage from "./createArticlePage/createArticle";


const MainComponent = () => (
  <main className="main">
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:slug" element={<SingleArticle />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/profile" element={<EditProfilePage />} />
      <Route path="/new-article" element={<CreateArticlePage />} />
    </Routes>
  </main>
);

export default MainComponent;
