import { DropzoneDialog } from "material-ui-dropzone";
import React from "react";

export default function dragNdrop(props) {
  const {
    onClose,
    onSave,
    open,
    acceptedFiles,
    showPreviews,
    maxFileSize,
    ...other
  } = props;
  return (
    <DropzoneDialog
      showPreviews={showPreviews}
      maxFileSize={maxFileSize}
      acceptedFiles={acceptedFiles}
      open={open}
      onSave={onSave}
      onClose={onClose}
      {...other}
    />
  );
}
