import classNames from "classnames";
import { forwardRef } from "react";
import { MySubmitInputProps } from "../../../types";

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
