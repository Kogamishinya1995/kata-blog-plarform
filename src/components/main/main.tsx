import { Routes, Route } from "react-router-dom";
import ArticleList from "./articlesLIst/articlesLIst";
import CreateArticlePage from "./createArticlePage/createArticle";
import EditArticlePage from "./editArticlePage/editArticle";
import EditProfilePage from "./updateProfilePage/updateProfile";
import SignInPage from "./signInPage/signInPage";
import SignUpPage from "./signUpPage/signUpPage";
import SingleArticle from "./singleArticle/singleArticle";
import RequireAuth from "../hoc/RequireAuth";
import NotFoundPage from "./notFoundPage/notFoundPage";


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
