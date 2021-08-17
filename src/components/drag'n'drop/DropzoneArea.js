import { DropzoneDialog } from "material-ui-dropzone";
import React from "react";

export default function DropzoneDialogPopup(props) {
  const { openPopup, setOpenPopup } = props;

  function SubmitFile(file) {
    console.log("submitted");
  }
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
        showPreviews={true}
        showFileNamesInPreview={true}
        onSave={(files) => {
          setOpenPopup(false);
          SubmitFile(files);
        }}
      />
    </div>
  );
}
