import { forwardRef } from "react";
import { MyTextAreaProps } from "../../../types";

const FieldTextAreaComponent = forwardRef<HTMLTextAreaElement, MyTextAreaProps>(
  ({ title, error, ...props }, ref) => (
    <label className="form__field">
      <p className="form__field-name">{title}</p>
      <textarea rows={5} ref={ref} {...props} />
      {error && (
        <p className="form__field-error" style={{ color: "red" }}>
          {String(error.message)}
        </p>
      )}
    </label>
  )
);

FieldTextAreaComponent.displayName = "FieldTextAreaComponent";

export default FieldTextAreaComponent;
