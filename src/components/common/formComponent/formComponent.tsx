import React from "react";
import Button from "react-bootstrap/Button";
import { useForm, useFieldArray } from "react-hook-form";
import useCreateArticle from "../../../hooks/useCreateArticle";
import useUpdateArticle from "../../../hooks/useUpdateArticle";
import { CreateArticleFormData } from "../../../types";
import FieldComponent from "../../common/fieldComponent/FieldComponent";
import FieldTextAreaComponent from "../../common/fieldTextArea/fieldTextArea";
import SubmitInput from "../../common/submitInput/submitInput";
import ModalComponent from "../../common/modalComponent/modalComponent";

interface ArticleFormProps {
  isEditMode: boolean;
  articleData?: {
    title: string;
    description: string;
    text: string;
    tags: string[];
    slug?: string;
  };
}

const ArticleForm: React.FC<ArticleFormProps> = ({ isEditMode, articleData }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm<CreateArticleFormData>({
    mode: "onChange",
    defaultValues: isEditMode
      ? {
          title: articleData?.title,
          shortDescription: articleData?.description,
          text: articleData?.text,
          test: articleData?.tags.map((tag) => ({ tags: tag })) || [],
        }
      : {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const filtredtags = fields
    .map((item) => item.tags)
    .filter((item) => item !== "" && item !== undefined)
    .flat();

  const { onSubmit: createArticle, error: createError } = useCreateArticle(reset, filtredtags);
  const { onSubmit: updateArticle, error: updateError } = useUpdateArticle(reset, filtredtags, articleData?.slug || "");

  const onSubmit = async (data: CreateArticleFormData) => {
    try {
      if (isEditMode) {
        await updateArticle(data);
      } else {
        await createArticle(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h4>{isEditMode ? "Edit Article" : "Create New Article"}</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FieldComponent
          title="Title"
          type="text"
          {...register("title", {
            required: "Поле является обязательным",
            minLength: {
              value: 3,
              message: "Минимум 3 символа",
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
                  onClick={() => remove(index)}
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
            onClick={() => append({ tags: "" })}
          >
            Append
          </Button>
        </label>
        <SubmitInput value={isEditMode ? "Edit" : "Send"} isValid={isValid} />
      </form>
      {(createError || updateError) && <ModalComponent error={createError || updateError} />}
    </div>
  );
};

export default ArticleForm;
