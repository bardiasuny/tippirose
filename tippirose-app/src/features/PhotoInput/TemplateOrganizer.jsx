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

function TemplateOrganizer({
  templates,
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
      {templates && (
        <div className="flex_row flex_wrapper ph4">
          {templates.map(template => (
            <div key={template.name} className="flex_column justify_end ph4">
              <p className="p2">{template && template.name && template.name}</p>
              <div>
                <img
                  style={{ width: width, height: "auto" }}
                  src={template.sampleImage}
                />
              </div>

              {withButton && (
                <div>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(template)}
                  >
                    {buttonLeft}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}
export default TemplateOrganizer;

TemplateOrganizer.defaultProps = {
  width: 100,
  imagesAll: [],
  withButton: false,
  buttonLeft: "x",
  buttonRight: "MAIN",
  initialValues: {}
};
