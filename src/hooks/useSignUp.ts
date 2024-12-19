import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../slices/articlesApi";
import { setAuthData } from "../slices/authSlice";
import { SignUpFormData } from "../types";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../utils/erorrorHelpers";

const useSingUp = (reset: () => void) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setError(null);
      const result = await registerUser({
        username: data.userName,
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(
        setAuthData({
          token: result.user.token,
          username: result.user.username,
          email: result.user.email,
        })
      );
      reset();
      navigate("/");
    } catch (err) {
      let errMsg = "Произошла ошибка.";
      if (isFetchBaseQueryError(err)) {
        errMsg = "error" in err ? err.error : JSON.stringify(err.data);
      } else if (isErrorWithMessage(err)) {
        errMsg = err.message;
      }
      setError(
        `Извините, возникла ошибка при попытке зарегестрироваться:  ${errMsg}`
      );
    }
  };

  return { onSubmit, error };
};

export default useSingUp;
