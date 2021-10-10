import {
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Typography,
} from "@material-ui/core";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import AddUserLayout from "./AddUserLayout";

const initialValues = {
  email: "",
  username: "",
  roles: "",
};

const validationSchema = Yup.object({
  email: Yup.string("Enter user email id").required("email is Required"),
  username: Yup.string("Enter username").required("username is Required"),
  roles: Yup.string("Select Role").required("Role is required"),
});

function AddUserDialog(props) {
  const { open, handleClose, userRegisterHandler } = props;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      userRegisterHandler(values);
      console.log("submit handlers");
      handleClose();
      formik.setValues(initialValues);
    },
  });

  const handleCancel = () => {
    handleClose();
    formik.setValues(initialValues);
    formik.handleReset();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h3" color="primary" align="left">
            Add User Information
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <AddUserLayout formik={formik} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={formik.handleSubmit}
            disabled={!formik.isValid}
            color="primary"
          >
            Register User
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default AddUserDialog;
