import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSingUp from "../../../hooks/useSignUp";
import { SignUpFormData } from "../../../types";
import FieldComponent from "../../common/fieldComponent/FieldComponent";
import ModalComponent from "../../common/modalComponent/modalComponent";
import SubmitInput from "../../common/submitInput/submitInput";

const SignUpPage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<SignUpFormData>({
    mode: "onChange",
  });

  const password = watch("password");

  const { onSubmit, error, isLoading } = useSingUp(reset);

  return (
    <div className="form-container">
      <h4>Create new account</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FieldComponent
          title="Username"
          type="text"
          {...register("userName", {
            required: "Поле является обязательным",
            minLength: {
              value: 3,
              message: "Минимум 3 символа",
            },
            maxLength: {
              value: 20,
              message: "Максимум 20 символов",
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
              message: "Invalid email address",
            },
          })}
          error={errors.email}
        />
        <FieldComponent
          title="Password"
          type="text"
          {...register("password", {
            required: "Поле является обязательным",
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
          title="Repeat Password"
          type="password"
          {...register("repeatPassword", {
            required: "Поле является обязательным",
            validate: (value) => value === password || "Пароли не совпадают",
          })}
          error={errors.repeatPassword}
        />
        <label className="form__checkbox">
          <input
            type="checkbox"
            {...register("agreement", {
              required: "Вы должны согласиться с условиями",
            })}
          />
          I agree to the processing of personal data
          {errors.agreement && (
            <p className="form__checkbox-error" style={{ color: "red" }}>
              {String(errors.agreement.message)}
            </p>
          )}
        </label>
        <SubmitInput value="Create Account" isValid={isValid} disabled={isLoading} />
      </form>
      <p className="form_have-Account-Message">
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
      <ModalComponent error={error} />
    </div>
  );
};

export default SignUpPage;
