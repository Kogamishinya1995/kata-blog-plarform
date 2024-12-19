import { useLocation } from "react-router-dom";
import ArticleForm from "../../common/formComponent/formComponent";

const EditArticlePage = () => {
  const location = useLocation();
  const articleData = location.state;

  return <ArticleForm isEditMode={true} articleData={articleData} />;
};

export default EditArticlePage;
