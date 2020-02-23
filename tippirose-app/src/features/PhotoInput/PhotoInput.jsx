import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DropZoneInput from "./DropZoneInput";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../components/CustomButtons/Button";
const style = {};

const useStyles = makeStyles(style);

function PhotoInput({ setImages, images }) {
  const [files, setFiles] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (images && images.length > 0) {
      setImages(images.concat(files));
    } else {
      setImages(files);
    }
  }, [files]);

  const handleDeleteImage = fileID => {
    const newImage = images.filter(image => image.id !== fileID);
    setImages(newImage);
  };

  const handleMainImage = fileID => {
    const theOne = images.filter(image => image.id === fileID);
    const theRest = images.filter(image => image.id !== fileID);

    setImages(theOne.concat(theRest));
  };

  return (
    <Fragment>
      <DropZoneInput setFiles={setFiles} files={files} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images &&
          images.map(file => (
            <div className="flex_column justify_end p2">
              <img style={{ width: 100, height: "auto" }} src={file.preview} />

              <div>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => handleDeleteImage(file.id)}
                >
                  x
                </Button>
                {images[0].id !== file.id && (
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => handleMainImage(file.id)}
                  >
                    Main
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
}
export default PhotoInput;
