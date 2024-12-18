import Button from "react-bootstrap/Button";
import { useForm, useFieldArray } from "react-hook-form";
import useCreateArticle from "./useCreateArticle";
import { CreateArticleFormData } from "../../../types";
import FieldComponent from "../../common/fieldComponent/FieldComponent";
import FieldTextAreaComponent from "../../common/fieldTextArea/fieldTextArea";
import SubmitInput from "../../common/submitInput/submitInput";

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
        <FieldTextAreaComponent
          title="Text"
          {...register("text", {
            required: "Поле является обязательным",
          })}
          error={errors.text}
        />
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
        <SubmitInput value="send" isValid={isValid} />
      </form>
    </div>
  );
};

export default CreateArticlePage;
