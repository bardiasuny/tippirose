import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import cuid from "cuid";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const DropZoneInput = ({ setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: cuid(),
            blob: "blob"
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
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
        <h4>Drop Images here</h4>
      </div>
    </div>
  );
};

export default DropZoneInput;
