import classNames from "classnames";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateArticleMutation } from "../../../slices/articlesApi";
import { useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { Input } from "antd";


interface CreateArticleFormData {
  title: string;
  shortDescription: string;
  text: string;
  test: {
    tags: string | string[];
  }[];
}

const EditArticlePage = () => {
    
    const location = useLocation();
    const articleData = location.state;
    const tags = articleData.tags.map((item) => ({ tags: [item] }));
    const slug = articleData.slug;
    console.log(articleData.text);
    const [updated, setUpdated] = useState(false);

    const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm<CreateArticleFormData>({
    mode: "onChange",
    defaultValues: {
        title: articleData.title,
        shortDescription: articleData.description,
        text: articleData.text,
        test: tags,
      },
  });
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [updateArticle, { isLoading, error }] = useUpdateArticleMutation();
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
      const result = await updateArticle({
        article: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: filtredtags,
        },
        token,
        slug,
      }).unwrap();
      console.log("Update successful:", result);
      reset();
      navigate(`/articles/${result.article.slug}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };


  return (
    <div className="form-container">
      <h4>Edit Article</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form__field">
          <p className="form__field-name">Title</p>
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
            <p className="form__field-error" style={{ color: "red" }}>
              {String(errors.title.message)}
            </p>
          )}
        </label>
        <label className="form__field">
          <p className="form__field-name">Short description</p>
          <input
            type="shortDescription"
            {...register("shortDescription", {
              required: "Поле является обязательным",
            })}
          />
          {errors.shortDescription && (
            <p className="form__field-error" style={{ color: "red" }}>
              {String(errors.shortDescription.message)}
            </p>
          )}
        </label>
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
                <input {...register(`test.${index}.tags` as const)} className="form-tags__input" />
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
          className="create-form-tags__append-button"
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

export default EditArticlePage;
