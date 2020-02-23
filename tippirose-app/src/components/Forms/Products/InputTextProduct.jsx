import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
const style = {
  iconAtached: {
    height: 54,
    width: 60,
    fontSize: 20,
    borderTop: "1px solid #cbcbcb",
    borderBottom: "1px solid #cbcbcb",
    borderRight: "1px solid #cbcbcb",
    background: "#cbcbcb"
  }
};

const useStyles = makeStyles(style);

const InputTextProduct = ({
  input,
  width,
  type,
  min,
  max,
  step,
  label,
  info,
  placeholder,
  multiline,
  row,
  icon,
  meta: { touched, error }
}) => {
  const classes = useStyles();
  return (
    <div className="ph1">
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

      <div className="ph2 flex_row">
        <TextField
          style={{ width: width || "100%" }}
          error={touched && !!error}
          variant="outlined"
          label={placeholder}
          helperText={error}
          {...input}
          placeholder={placeholder}
          type={type}
          min={min}
          max={max}
          step={step}
          multiline
          rows={row}
        />
        {icon && (
          <div
            className={classes.iconAtached}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
export default InputTextProduct;
