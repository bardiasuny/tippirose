import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = ({
  input,
  width,
  type,
  min,
  max,
  step,
  label,
  info,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div>
      <label>
        {label && label}
        {/* {info && (
          <Popup
            content={info}
            trigger={<Icon name="info" color="grey" className="infoFormIcon" />}
          />
        )} */}
      </label>

      <TextField
        error={touched && !!error}
        id="standard-error-helper-text"
        label={placeholder}
        helperText={error}
        {...input}
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default TextInput;
