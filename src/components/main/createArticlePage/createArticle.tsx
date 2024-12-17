import classNames from "classnames";
import Button from "react-bootstrap/Button";
import { useForm, useFieldArray } from "react-hook-form";
import FieldComponent from "../../common/fieldComponent/FieldComponent";
import useCreateArticle from "./useCreateArticle";
import { CreateArticleFormData } from "../../../types";

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const filtredtags = fields
    .map((item) => item.tags)
    .filter((item) => item !== "" && item !== undefined)
    .flat();

  const onSubmit = useCreateArticle(reset, filtredtags);

  return (
    <div className="form-container">
      <h4>Create new article</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FieldComponent
          title="Title"
          type="text"
          {...register("title", {
            required: "Поле является обязательным",
            minLength: {
              value: 3,
              message: "Минимум 1 символа",
            },
          })}
          error={errors.title}
        />
        <FieldComponent
          title="Short description"
          type="shortDescription"
          {...register("shortDescription", {
            required: "Поле является обязательным",
          })}
          error={errors.shortDescription}
        />
        <label className="form__field">
          <p className="form__field-name">Text</p>
          <textarea
            rows={5}
            {...register("text", {
              required: "Поле является обязательным",
            })}
          />
          {errors.text && (
            <p className="form__field-error" style={{ color: "red" }}>
              {String(errors.text.message)}
            </p>
          )}
        </label>
        <label className="form-tags-container">
          <ul>
            {fields.map((item, index) => (
              <li className="form-tags" key={item.id}>
                <input
                  {...register(`test.${index}.tags` as const)}
                  className="form-tags__input"
                />
                <Button
                  variant="btn btn-outline-danger"
                  className="form-tags__delete-button"
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <Button
            className="form-tags__append-button"
            variant="btn btn-outline-primary"
            type="button"
            onClick={() => {
              append({ tags: "" });
            }}
          >
            append
          </Button>
          {errors.text && (
            <p className="form__field-error" style={{ color: "red" }}>
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
