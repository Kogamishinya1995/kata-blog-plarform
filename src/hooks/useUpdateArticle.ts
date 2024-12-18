import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateArticleMutation } from '../slices/articlesApi';
import { RootState } from '../slices';
import { CreateArticleFormData } from '../types';

const useUpdateArticle = (reset: () => void, filtredtags: string[], slug: string) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [updateArticle, { error }] = useUpdateArticleMutation();

  const onSubmit = async (data: CreateArticleFormData) => {
    try {
      const result = await updateArticle({
        article: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: filtredtags,
        },
        token,
        slug,
      }).unwrap();
      reset();
      navigate(`/articles/${result.article.slug}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return { onSubmit, error };
};

export default useUpdateArticle;
