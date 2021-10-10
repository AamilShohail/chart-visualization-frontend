import { DropzoneDialog } from "material-ui-dropzone";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

export default function DropzoneDialogPopup(props) {
  const { openPopup, setOpenPopup, uploadSheet, isError } = props;
  return (
    <div>
      <DropzoneDialog
        open={openPopup}
        showPreviews={true}
        useChipsForPreview
        onClose={() => setOpenPopup(false)}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        acceptedFiles={[
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ]}
        showFileNamesInPreview={true}
        onSave={(files) => {
          if (isError) setOpenPopup(false);
          uploadSheet(files);
        }}
      ></DropzoneDialog>
    </div>
  );
}
