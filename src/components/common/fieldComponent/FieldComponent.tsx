import { forwardRef } from "react";
import { MyInputProps } from "../../../types";

const FieldComponent = forwardRef<HTMLInputElement, MyInputProps>(
  ({ title, error, serverError, ...props }, ref) => (
    <label className="form__field">
      <p className="form__field-name">{title}</p>
      <input ref={ref} {...props} />
      {(error || serverError) && (
        <p className="form__field-error" style={{ color: "red" }}>
          {String(error?.message || serverError)}
        </p>
      )}
    </label>
  )
);

FieldComponent.displayName = "FieldComponent";

export default FieldComponent;
