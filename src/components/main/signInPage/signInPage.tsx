import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useLogInUserMutation } from "../../../slices/articlesApi";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";

interface SignInFormData {
    email: string;
    password: string;
}

const SignUpPage = () => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm<SignInFormData>({
        mode: "onChange",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logInUser, { isLoading, error }] = useLogInUserMutation(); 

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await logInUser({
                email: data.email,
                password: data.password,
            }).unwrap();
            console.log("Log In successful:", result);
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
            console.error("Log In failed:", err);
        }
    };

    return (
        <div className="signIn-container">
            <h4>Sign In</h4>
            <form className="signIn-form" onSubmit={handleSubmit(onSubmit)}>
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
                        })}  
                    />
                    {errors.password && (
                        <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.password.message)}</p>
                    )}
                </label>
                <input
                    type="submit"
                    value="Login"
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
