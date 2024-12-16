import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { articlesApi, useUpdateUserMutation } from "../../../slices/articlesApi";
import { updateAuthData } from "../../../slices/authSlice";

interface UpdateUserForm {
  userName: string;
  email: string;
  password: string;
  avatar: string;
}

const EditProfilePage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UpdateUserForm>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const onSubmit = async (data: UpdateUserForm) => {
    try {
      const result = await updateUser({
        user: {
          username: data.userName,
          email: data.email,
          password: data.password,
          image: data.avatar,
        },
        token,
      }).unwrap();

      console.log("Update successful:", result);
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
      dispatch(articlesApi.util.invalidateTags(['Articles']));
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="signIn-container">
      <h4>Edit Profile</h4>
      <form className="signIn-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="signIn-form__field">
          <p className="signIn-form__field-name">Username</p>
          <input
            type="text"
            {...register("userName", {
              minLength: {
                value: 1,
                message: "Имя пользователя должно содержать не менее 1 символа",
              },
            })}
          />
          {errors.userName && (
            <p className="signIn-form__field-error" style={{ color: "red" }}>
              {String(errors.userName.message)}
            </p>
          )}
        </label>
        <label className="signIn-form__field">
          <p className="signIn-form__field-name">Email address</p>
          <input
            type="text"
            {...register("email", {
              required: "Поле является обязательным",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                message: "Некорректный e-mail",
              },
            })}
          />
          {errors.email && (
            <p className="signIn-form__field-error" style={{ color: "red" }}>
              {String(errors.email.message)}
            </p>
          )}
        </label>
        <label className="signIn-form__field">
          <p className="signIn-form__field-name">New Password</p>
          <input
            type="password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
              maxLength: {
                value: 40,
                message: "Максимум 40 символов",
              },
            })}
          />
          {errors.password && (
            <p className="signIn-form__field-error" style={{ color: "red" }}>
              {String(errors.password.message)}
            </p>
          )}
        </label>
        <label className="signIn-form__field">
          <p className="signIn-form__field-name">Avatar image (url)</p>
          <input
            type="text"
            {...register("avatar", {
              pattern: {
                value: /(https?:\/\/.*\.(?:png|jpg))/i,
                message: "Invalid avatar URL",
              },
            })}
          />
          {errors.avatar && (
            <p className="signIn-form__field-error" style={{ color: "red" }}>
              {String(errors.avatar.message)}
            </p>
          )}
        </label>
        <input
          type="submit"
          value="Create"
          disabled={!isValid}
          className={classNames("submit-button", {
            "submit-button--disabled": !isValid,
            "submit-button--enabled": isValid,
          })}
        />
      </form>
      <p className="signIn-form_have-Account-Message">
        Already have an account? Sign In.
      </p>
    </div>
  );
};

export default EditProfilePage;
