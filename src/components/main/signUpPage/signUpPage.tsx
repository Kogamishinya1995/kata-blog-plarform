import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useRegisterUserMutation } from "../../../slices/articlesApi";

interface SignUpFormData {
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;
    agreement: boolean;
}

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

    const [registerUser, { isLoading, error }] = useRegisterUserMutation(); 

    const onSubmit = async (data: SignUpFormData) => {
    try {
        const result = await registerUser({
            username: data.userName,
            email: data.email,
            password: data.password,
        }).unwrap();
        console.log("Registration successful:", result);
        reset();
    } catch (err) {
        console.error("Registration failed:", err);
    }
};

    const password = watch("password");

    return (
        <div className="signIn-container">
            <h4>Create new account</h4>
            <form className="signIn-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="signIn-form__field">
                    <p className="signIn-form__field-name">User Name</p>
                    <input
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
                            }
                        })}  
                    />
                    {errors.userName && (
                        <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.userName.message)}</p>
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
                                message: 'Invalid email address',
                              },
                        })}  
                    />
                    {errors.email && <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.email.message)}</p>}
                </label>
                <label className="signIn-form__field">
                <p className="signIn-form__field-name">Password</p>
                    <input
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
                            }
                        })}  
                    />
                    {errors.password && (
                        <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.password.message)}</p>
                    )}
                </label>
                <label className="signIn-form__field">
                <p className="signIn-form__field-name">Repeat Password</p>
                    <input
                        type="password"
                        {...register("repeatPassword", {
                            required: "Поле является обязательным",
                            validate: value =>
                                value === password || "Пароли не совпадают",
                        })}
                    />
                    {errors.repeatPassword && (
                        <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.repeatPassword.message)}</p>
                    )}
                </label>
                <label className="signIn-form__checkbox">
                    <input
                        type="checkbox"
                        {...register("agreement", {
                            required: "Вы должны согласиться с условиями",
                        })}
                    />
                    I agree to the processing of personal data
                    {errors.agreement && (
                        <p className="signIn-form__checkbox-error" style={{ color: "red" }}>{String(errors.agreement.message)}</p>
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
            <p className="signIn-form_have-Account-Message">Already have an account? Sign In.</p>
        </div>
    );
};

export default SignUpPage;
