import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: FieldError;
}

const FieldComponent = forwardRef<HTMLInputElement, MyInputProps>(({ title, error, ...props }, ref) => {
  return (
    <label className="form__field">
      <p className="form__field-name">{title}</p>
      <input ref={ref} {...props} />
      {error && (
        <p className="form__field-error" style={{ color: "red" }}>
          {String(error.message)}
        </p>
      )}
    </label>
  );
});

FieldComponent.displayName = 'FieldComponent';

export default FieldComponent;