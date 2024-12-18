import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreateArticleMutation } from '../slices/articlesApi';
import { RootState } from '../slices';
import { CreateArticleFormData } from '../types';
import { useState } from 'react';
import { isFetchBaseQueryError, isErrorWithMessage } from '../utils/erorrorHelpers';

const useCreateArticle = (reset: () => void, filtredtags: string[]) => { 
  const navigate = useNavigate(); 
  const token = useSelector((state: RootState) => state.auth.token); 
  const [createArticle] = useCreateArticleMutation(); 
  const [error, setError] = useState<string | null>(null); 
 
  const onSubmit = async (data: CreateArticleFormData) => { 
    try { 
      setError(null); 
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

export default useCreateArticle;