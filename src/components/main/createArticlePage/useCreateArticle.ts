import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateArticleMutation } from '../../../slices/articlesApi';
import { RootState } from '../../../slices';
import { CreateArticleFormData } from '../../../types';

const useCreateArticle = (reset: () => void, filtredtags: string[]) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [createArticle] = useCreateArticleMutation();

  const onSubmit = async (data: CreateArticleFormData) => {
    try {
      const result = await createArticle({
        article: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: filtredtags,
        },
        token,
      }).unwrap();

      reset();
      navigate(`/articles/${result.article.slug}`);
    } catch (err) {
      console.error("Article creation failed:", err);
    }
  };

  return onSubmit;
};

export default useCreateArticle;