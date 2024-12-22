import { useForm } from "react-hook-form";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { UpdateUserForm } from "../../../types";
import FieldComponent from "../../common/fieldComponent/FieldComponent";
import ModalComponent from "../../common/modalComponent/modalComponent";
import SubmitInput from "../../common/submitInput/submitInput";

const EditProfilePage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UpdateUserForm>({
    mode: "onChange",
  });

  const { onSubmit, error, isLoading } = useUpdateUser(reset);

  return (
    <div className="form-container">
      <h4>Edit Profile</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FieldComponent
          title="Username"
          type="text"
          {...register("userName", {
            minLength: {
              value: 1,
              message: "Имя пользователя должно содержать не менее 1 символа",
            },
          })}
          error={errors.userName}
        />
        <FieldComponent
          title="Email address"
          type="text"
          {...register("email", {
            required: "Поле является обязательным",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
              message: "Некорректный e-mail",
            },
          })}
          error={errors.email}
        />
        <FieldComponent
          title="New Password"
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
          error={errors.password}
        />
        <FieldComponent
          title="Avatar image (url)"
          type="text"
          {...register("avatar", {
            pattern: {
              value: /(https?:\/\/.*\.(?:png|jpg))/i,
              message: "Invalid avatar URL",
            },
          })}
          error={errors.avatar}
        />
        <SubmitInput value="Update" isValid={isValid} disabled={isLoading} />
        {error && <ModalComponent error={error} />}
      </form>
    </div>
  );
};

export default EditProfilePage;
