import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../slices";
import { articlesApi, useUpdateUserMutation } from "../slices/articlesApi";
import { updateAuthData } from "../slices/authSlice";
import { UpdateUserForm } from "../types";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../utils/erorrorHelpers";

const useUpdateUser = (reset: () => void) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [updateUser] = useUpdateUserMutation();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const onSubmit = async (data: UpdateUserForm) => {
    try {
      setError(null); 
      const result = await updateUser({
        user: {
          username: data.userName,
          email: data.email,
          password: data.password,
          image: data.avatar,
        },
        token,
      }).unwrap();

      dispatch(
        updateAuthData({
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
      setError(`Извините, возникла ошибка при обновлении профиля:  ${errMsg}`);
    }
  };

  return { onSubmit, error };
};

export default useUpdateUser;
