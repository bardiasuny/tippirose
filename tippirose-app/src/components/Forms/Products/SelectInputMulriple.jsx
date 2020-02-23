import React from "react";
import { Form, Label, Select, Popup, Icon } from "semantic-ui-react";

const SelectInput = ({
  input,
  placeholder,
  multiple,
  options,
  defaultValue,
  defaultOpen,
  disabled,
  className,
  label,
  info,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} className="ph2">
      <label>
        {label}
        {info && (
          <Popup
            content={info}
            trigger={<Icon name="info" color="grey" className="infoFormIcon" />}
          />
        )}
      </label>

      <Select
        className={className}
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
        defaultValue={defaultValue}
        defaultOpen={defaultOpen}
        search
        disabled={disabled}
        style={{ width: "100%" }}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
