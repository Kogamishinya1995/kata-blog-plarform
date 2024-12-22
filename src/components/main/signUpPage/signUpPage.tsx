import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignUp from "../../../hooks/useSignUp";
import { SignUpFormData } from "../../../types";
import FieldComponent from "../../common/fieldComponent/FieldComponent";
import SubmitInput from "../../common/submitInput/submitInput";
import { useEffect, useState } from "react";

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
  const { onSubmit, error, isLoading } = useSignUp(reset);
  const [serverErrors, setServerErrors] = useState<{ errors?: { username?: string; email?: string } }>({});

  useEffect(() => {
    if (error) {
      try {
        const parsedError = typeof error === 'string' ? JSON.parse(error) : error;
        setServerErrors(parsedError);
      } catch (err) {
        console.error('Ошибка при разборе серверной ошибки:', err);
      }
    }
  }, [error]);

  return (
    <div className="form-container">
      <h4>Создать новую учетную запись</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FieldComponent
          title="Имя пользователя"
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
          serverError={serverErrors.errors?.username}
        />
        <FieldComponent
          title="Email"
          type="text"
          {...register("email", {
            required: "Поле является обязательным",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
              message: "Неверный адрес электронной почты",
            },
          })}
          error={errors.email}
          serverError={serverErrors.errors?.email}
        />
        <FieldComponent
          title="Пароль"
          type="password"
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
          title="Повторите пароль"
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
          Я согласен на обработку персональных данных
          {errors.agreement && (
            <p className="form__checkbox-error" style={{ color: "red" }}>
              {String(errors.agreement.message)}
            </p>
          )}
        </label>
        
        <SubmitInput value="Создать учетную запись" isValid={isValid} disabled={isLoading} />
      </form>
      <p className="form_have-Account-Message">
        У вас уже есть аккаунт? <Link to="/sign-in">Войти.</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
