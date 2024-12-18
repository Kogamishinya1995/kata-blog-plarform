import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateArticleMutation } from '../slices/articlesApi';
import { RootState } from '../slices';
import { CreateArticleFormData } from '../types';
import { isFetchBaseQueryError, isErrorWithMessage } from '../utils/erorrorHelpers';
import { useState } from 'react';

const useUpdateArticle = (reset: () => void, filtredtags: string[], slug: string) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [updateArticle] = useUpdateArticleMutation();
  const [error, setError] = useState<string | null>(null); 
  

  const onSubmit = async (data: CreateArticleFormData) => {
    try {
      setError(null); 
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
      let errMsg = 'Произошла ошибка.';
      if (isFetchBaseQueryError(err)) { 
        errMsg = 'error' in err ? err.error : JSON.stringify(err.data); 
      } else if (isErrorWithMessage(err)) { 
        errMsg = err.message; 
      } 
      setError(`Извините, возникла ошибка при создании статьи:  ${errMsg}`);
    }
  };

  return { onSubmit, error };
};

export default useUpdateArticle;
