import { forwardRef } from "react";
import TextField from '@mui/material/TextField'; 
import { MyInputProps } from "../../../types";


const FieldTextArea = forwardRef<HTMLInputElement, MyInputProps>(
  ({ title, error, serverError, color, ...props }, ref) => (
    <label className="form__field">
      <p className="form__field-name">{title}</p>
      <TextField ref={ref} size={"small"} color={color} {...props}  multiline  rows={5}  />
      {(error || serverError) && (
        <p className="form__field-error" style={{ color: "red" }}>
          {String(error?.message || serverError)}
        </p>
      )}
    </label>
  )
);

FieldTextArea.displayName = "FieldComponent";

export default FieldTextArea;
