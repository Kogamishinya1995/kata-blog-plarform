import React, { forwardRef } from "react";
import classNames from "classnames";

interface MySubmitInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  isValid: boolean;
}

const SubmitInput = forwardRef<HTMLInputElement, MySubmitInputProps>(
  ({ value, isValid }, ref) => (
     <input
              ref={ref}
              type="submit"
              value={value}
              disabled={!isValid}
              className={classNames("submit-button", {
                "submit-button--disabled": !isValid,
                "submit-button--enabled": isValid,
              })}
            />
  )
);

SubmitInput.displayName = "FieldComponent";

export default SubmitInput;
