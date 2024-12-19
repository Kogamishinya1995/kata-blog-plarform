import ArticleForm from "../../common/formComponent/formComponent";

const CreateArticlePage = () => {
  return (
    <div className="form-container">
      <ArticleForm isEditMode={false} />
    </div>
  );
};

export default CreateArticlePage;
