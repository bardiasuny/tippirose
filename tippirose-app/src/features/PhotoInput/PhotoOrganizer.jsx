import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/CustomButtons/Button.js";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField
} from "@material-ui/core";
import SelectInputProduct from "components/Forms/Products/SelectInputProduct.jsx";

const style = {};

const useStyles = makeStyles(style);

function PhotoOrganizer({
  imagesAll,
  initialValues,
  handleDelete,
  handleSetMainImage,
  width,
  withButton,
  buttonLeft,
  buttonRight,
  withDropdown,
  assignProductColor
}) {
  const classes = useStyles();
  const [productColor, setProductColor] = useState();

  const handleProductColorAssign = async (color, img) => {
    console.log(color);
    await assignProductColor(initialValues, color, img);
  };

  return (
    <Fragment>
      {imagesAll && (
        <div className="flex_row flex_wrapper ph4">
          {imagesAll.map(img => (
            <div key={img.name} className="flex_column justify_end ph4">
              <div>
                <img style={{ width: width, height: "auto" }} src={img.url} />
              </div>

              {/* GET PRODUCT COLOR */}

              <FormControl
                variant="outlined"
                style={{ width: "100%", marginTop: 10 }}
              >
                <InputLabel
                  //ref={inputLabel}
                  htmlFor="outlined-age-native-simple"
                >
                  Color
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  for="outlined-error-helper-text"
                  value={img.color && img.color}
                  onChange={e => handleProductColorAssign(e.target.value, img)}
                  labelWidth={100}
                  inputProps={{
                    name: "age",
                    id: "outlined-age-native-simple"
                  }}
                  className="select_options"
                >
                  {initialValues &&
                    initialValues.color &&
                    initialValues.color.map(color => (
                      <MenuItem value={color} key={color}>
                        {color}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                style={{ width: "100%", marginTop: 10 }}
              >
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                />
              </FormControl>

              {withButton && (
                <div>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(img)}
                  >
                    {buttonLeft}
                  </Button>
                  {initialValues.mainImageName !== img.name && (
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => handleSetMainImage(img)}
                    >
                      {buttonRight}
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}
export default PhotoOrganizer;

PhotoOrganizer.defaultProps = {
  width: 100,
  imagesAll: [],
  withButton: false,
  buttonLeft: "x",
  buttonRight: "MAIN",
  initialValues: {}
};
