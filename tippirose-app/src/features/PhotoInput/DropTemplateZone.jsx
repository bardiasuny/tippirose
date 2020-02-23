import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import cuid from "cuid";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const DropTemplateZone = ({ setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: cuid()
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*"
  });

  return (
    <div
      {...getRootProps()}
      className={"dropzone " + (isDragActive && "dropzone--isActive")}
    >
      <input {...getInputProps()} />

      <div class="drop_zone_styled">
        <CloudUploadIcon
          style={{ color: "rgb(144, 150, 202)", fontSize: 100 }}
        />
        <h4>Drop SVG Template here</h4>
      </div>
    </div>
  );
};

export default DropTemplateZone;
