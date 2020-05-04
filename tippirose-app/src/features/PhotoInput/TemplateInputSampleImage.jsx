import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DropZoneInput from "./DropZoneInput";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../components/CustomButtons/Button";
import DropTemplateZone from "./DropTemplateZone";
import DropTemplateSampleImage from "./DropTemplateSampleImage";
const style = {};

const useStyles = makeStyles(style);

function TemplateInputSampleImage({
  setTemplateSampleImage,
  templateSampleImage
}) {
  const [files, setFiles] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setTemplateSampleImage(files);
  }, [files]);

  const handleDeleteImage = fileID => {
    setTemplateSampleImage([]);
  };

  //   const handleMainImage = fileID => {
  //     const theOne = images.filter(image => image.id === fileID);
  //     const theRest = images.filter(image => image.id !== fileID);

  //     setImages(theOne.concat(theRest));
  //   };

  return (
    <Fragment>
      <DropTemplateSampleImage setFiles={setFiles} files={files} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {templateSampleImage && templateSampleImage[0] && (
          <div className="flex_column justify_end p2">
            <img
              style={{ width: 100, height: "auto" }}
              src={templateSampleImage[0].preview}
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
export default TemplateInputSampleImage;
