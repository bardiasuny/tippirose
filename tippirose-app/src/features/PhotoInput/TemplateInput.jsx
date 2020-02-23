import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DropZoneInput from "./DropZoneInput";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../components/CustomButtons/Button";
import DropTemplateZone from "./DropTemplateZone";
const style = {};

const useStyles = makeStyles(style);

function TemplateInput({ setTemplate, template }) {
  const [files, setFiles] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setTemplate(files);
  }, [files]);

  const handleDeleteImage = fileID => {
    setTemplate([]);
  };

  //   const handleMainImage = fileID => {
  //     const theOne = images.filter(image => image.id === fileID);
  //     const theRest = images.filter(image => image.id !== fileID);

  //     setImages(theOne.concat(theRest));
  //   };

  return (
    <Fragment>
      <DropTemplateZone setFiles={setFiles} files={files} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {template && template[0] && (
          <div className="flex_column justify_end p2">
            <img
              style={{ width: 100, height: "auto" }}
              src={template[0].preview}
            />

            <div>
              <Button
                size="sm"
                color="danger"
                onClick={() => handleDeleteImage()}
              >
                x
              </Button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
export default TemplateInput;
