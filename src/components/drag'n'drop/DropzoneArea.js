import { DropzoneDialog } from "material-ui-dropzone";
import React from "react";
import axios, { post } from "axios";

export default function DropzoneDialogPopup(props) {
  const { openPopup, setOpenPopup,uploadSheet } = props;

  function SubmitFile(file) {
    uploadSheet()
    // console.log(file[0]);
    // const url = "http://localhost:8080/excel/upload/1";
      // const formData = new FormData();
      // formData.append("file", file[0]);
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.token}`,
    //     "content-type": "application/x-www-form-urlencoded",
    //   },
    // };
    // axios
    //   .post(url,formData, config)
    //   .then((r) => console.log(r))
    //   .catch((e) => console.log(e));
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
        showFileNamesInPreview={true}
        onSave={(files) => {
          setOpenPopup(false);
          uploadSheet(files);
        }}
      >
      </DropzoneDialog>
    </div>
  );
}
