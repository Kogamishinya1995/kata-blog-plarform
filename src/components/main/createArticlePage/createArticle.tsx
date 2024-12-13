import { useForm, useFieldArray, Controller } from "react-hook-form";
import classNames from "classnames";
import { useLogInUserMutation } from "../../../slices/articlesApi";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface SignInFormData {
    title: string;
    shortDescription: string;
    text: string;
    test: {
    tags: string | string[];
  }[];
}

const CreateArticlePage = () => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
        control,
    } = useForm<SignInFormData>({
        mode: "onChange",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logInUser, { isLoading, error }] = useLogInUserMutation();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "test"
      }); 

      useEffect(
        () => {
            console.log('поля', fields);
        }, [fields])

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
            <h4>Create new article</h4>
            <form className="signIn-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="signIn-form__field">
                <p className="signIn-form__field-name">Title</p>
                    <input
                        type="text"
                        {...register("title", { 
                            required: "Поле является обязательным",
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                                message: 'Invalid email address',
                              },
                        })}  
                    />
                    {errors.title && <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.title.message)}</p>}
                </label>
                <label className="signIn-form__field">
                <p className="signIn-form__field-name">Short description</p>
                    <input
                        type="shortDescription"
                        {...register("shortDescription", { 
                            required: "Поле является обязательным",
                        })}  
                    />
                    {errors.shortDescription && (
                        <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.shortDescription.message)}</p>
                    )}
                </label>
                <label className="signIn-form__field">
                <p className="signIn-form__field-name">Text</p>
                    <textarea
                        rows="5"
                        type="text"
                        {...register("text", { 
                            required: "Поле является обязательным",
                        })}  
                    />
                    {errors.text && (
                        <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.text.message)}</p>
                    )}
                </label>
                <label className="signIn-form__tags">
                <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`test.${index}.tags` as const)} />
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ tags: [] })}
      >
        append
      </button>
                    {errors.text && (
                        <p className="signIn-form__field-error" style={{ color: "red" }}>{String(errors.text.message)}</p>
                    )}
                </label>
                <input
                    type="submit"
                    value="Send"
                    disabled={!isValid}
                    className={classNames("submit-button", {
                        "submit-button--disabled": !isValid,
                        "submit-button--enabled": isValid,
                    })}
                />
            </form>
        </div>
    );
};

export default CreateArticlePage;
