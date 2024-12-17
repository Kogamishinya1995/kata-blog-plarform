import classNames from "classnames";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateArticleMutation } from "../../../slices/articlesApi";
import { RootState } from "../../../slices";

interface CreateArticleFormData {
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
  } = useForm<CreateArticleFormData>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const [createArticle, { isLoading, error }] = useCreateArticleMutation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const filtredtags = fields
    .map((item) => item.tags)
    .filter((item) => item !== "" && item !== undefined)
    .flat();

  const onSubmit = async (data: CreateArticleFormData) => {
    try {
      const result = await createArticle({
        article: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: filtredtags,
        },
        token,
      }).unwrap();
      console.log("Log In successful:", result);
      reset();
      navigate(`/articles/${result.article.slug}`);
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
              minLength: {
                value: 1,
                message: "Минимум 1 символа",
              },
            })}
          />
          {errors.title && (
            <p className="signIn-form__field-error" style={{ color: "red" }}>
              {String(errors.title.message)}
            </p>
          )}
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
            <p className="signIn-form__field-error" style={{ color: "red" }}>
              {String(errors.shortDescription.message)}
            </p>
          )}
        </label>
        <label className="signIn-form__field">
          <p className="signIn-form__field-name">Text</p>
          <textarea
            rows={5}
            {...register("text", {
              required: "Поле является обязательным",
            })}
          />
          {errors.text && (
            <p className="signIn-form__field-error" style={{ color: "red" }}>
              {String(errors.text.message)}
            </p>
          )}
        </label>
        <label className="signIn-form__tags">
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <input {...register(`test.${index}.tags` as const)} />
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              append({ tags: "" });
            }}
          >
            append
          </button>
          {errors.text && (
            <p className="signIn-form__field-error" style={{ color: "red" }}>
              {String(errors.text.message)}
            </p>
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
