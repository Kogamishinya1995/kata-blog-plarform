import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogInUserMutation, articlesApi } from "../slices/articlesApi";
import { setAuthData } from "../slices/authSlice";
import { SignInFormData } from "../types";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../utils/erorrorHelpers";

const useSingIn = (reset: () => void) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logInUser, {isLoading}] = useLogInUserMutation();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignInFormData) => {
    try {
      setError(null);
      const result = await logInUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(
        setAuthData({
          token: result.user.token,
          username: result.user.username,
          email: result.user.email,
          image: result.user.image,
        })
      );
      reset();
      navigate("/");
      dispatch(articlesApi.util.invalidateTags(["Articles"]));
    } catch (err) {
      let errMsg = "Произошла ошибка.";
      if (isFetchBaseQueryError(err)) {
        errMsg = "error" in err ? err.error : JSON.stringify(err.data);
      } else if (isErrorWithMessage(err)) {
        errMsg = err.message;
      }
      setError(
        `Извините, возникла ошибка при попытке войти в аккаунт:  ${errMsg}`
      );
    }
  };

  return { onSubmit, error, isLoading };
};

export default useSingIn;

