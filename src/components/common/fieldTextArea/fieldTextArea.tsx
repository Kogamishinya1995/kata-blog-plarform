import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface MyTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  error?: FieldError;
}

const FieldTextAreaComponent = forwardRef<HTMLTextAreaElement, MyTextAreaProps>(
  ({ title, error, ...props }, ref) => (
    <label className="form__field">
      <p className="form__field-name">{title}</p>
      <textarea
      rows={5}
      ref={ref} {...props} />
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
