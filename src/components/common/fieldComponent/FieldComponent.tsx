import { forwardRef } from "react";
import { MyInputProps } from "../../../types";

const FieldComponent = forwardRef<HTMLInputElement, MyInputProps>(
  ({ title, error, ...props }, ref) => (
    <label className="form__field">
      <p className="form__field-name">{title}</p>
      <input ref={ref} {...props} />
      {error && (
        <p className="form__field-error" style={{ color: "red" }}>
          {String(error.message)}
        </p>
      )}
    </label>
  )
);

FieldComponent.displayName = "FieldComponent";

export default FieldComponent;
