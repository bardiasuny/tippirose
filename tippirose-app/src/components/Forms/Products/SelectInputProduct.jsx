import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
const style = {};

const useStyles = makeStyles(style);

const SelectInputProduct = ({
  input,
  placeholder,
  displayEmpty,
  multiple,
  options,
  defaultValue,
  value,
  defaultOpen,
  disabled,
  className,
  label,
  info,
  meta: { touched, error }
}) => {
  const classes = useStyles();
  return (
    <div className="ph2">
      {label && (
        <label className="sub_dark">
          {label && label}
          {/* {info && (
          <Popup
            content={info}
            trigger={<Icon name="info" color="grey" className="infoFormIcon" />}
          />
        )} */}
          <br />
        </label>
      )}

      <div className="ph1">
        <FormControl
          variant="outlined"
          className={classes.formControl}
          style={{ width: "100%" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            {input.name}
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            for="outlined-error-helper-text"
            displayEmpty={displayEmpty}
            value={input.value || value || null}
            onChange={(e, data) => input.onChange(data.value)}
            //labelWidth={labelWidth}
            placeholder={placeholder}
            multiple={multiple}
            defaultValue={defaultValue}
            defaultOpen={defaultOpen}
            search
            disabled={disabled}
            {...input}
          >
            {options &&
              options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text || option}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
export default SelectInputProduct;
