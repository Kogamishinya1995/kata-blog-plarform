import { Routes, Route } from "react-router-dom";
import ArticleList from "./articlesLIst/articlesLIst";
import CreateArticlePage from "./createArticlePage/createArticle";
import EditArticlePage from "./editArticlePage/editArticle";
import NotFoundPage from "./notFoundPage/notFoundPage";
import SignInPage from "./signInPage/signInPage";
import SignUpPage from "./signUpPage/signUpPage";
import SingleArticle from "./singleArticle/singleArticle";
import EditProfilePage from "./updateProfilePage/updateProfile";
import RequireAuth from "../hoc/RequireAuth";

const MainComponent = () => (
  <main className="main">
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:slug" element={<SingleArticle />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <EditProfilePage />
          </RequireAuth>
        }
      />
      <Route
        path="/new-article"
        element={
          <RequireAuth>
            <CreateArticlePage />
          </RequireAuth>
        }
      />
      <Route
        path="/articles/:slug/edit"
        element={
          <RequireAuth>
            <EditArticlePage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </main>
);

export default MainComponent;
