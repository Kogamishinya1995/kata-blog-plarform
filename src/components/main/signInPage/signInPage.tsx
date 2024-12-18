import { useForm } from "react-hook-form";
import useSingIn from "../../../hooks/useSignIn";
import { SignInFormData } from "../../../types";
import FieldComponent from "../../common/fieldComponent/FieldComponent";
import ModalComponent from "../../common/modalComponent/modalComponent";
import SubmitInput from "../../common/submitInput/submitInput";

const SignUpPage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<SignInFormData>({
    mode: "onChange",
  });

  const { onSubmit, error } = useSingIn(reset);

  return (
    <div className="form-container">
      <h4>Sign In</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          })}
          error={errors.password}
        />
        <SubmitInput value="Login" isValid={isValid} />
      </form>
      <ModalComponent error={error} />
    </div>
  );
};

export default SignUpPage;
