import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as Yup from "yup";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Backdrop,
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Paper,
  Dialog,
  Typography,
} from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import {AdminDashboard} from "../../api/agent"

const initialValues = {
  sheetCode: "",
  sheetName: "",
};
const validationSchema = Yup.object({
  sheetCode: Yup.string("Enter sheet code").required("sheet code is Required"),
  sheetName: Yup.string("Enter sheet name").required("sheet name is Required"),
});
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddSheetModal({ submitHandler, isOpen, cancelHandler }) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AdminDashboard.RegisterUser(values)
        //TODO: add toast
        .then((res) => {
          if (res.status === 201) {
            // toast.success("User Registration Successful", {
            //     position: "top-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
            formik.resetForm();
            console.log("sheet data uploaded");
          }
        })
        .catch(
          (error) => {
            console.log("error in sheet data uploaded");
            console.log(error);
          }
          // toast.error("User Already exists", {
          //     position: "top-center",
          //     autoClose: 3000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          // })
        );
      cancelHandler();
      formik.setValues(initialValues);
    },
  });
  return (
    <Dialog
      open={isOpen}
      onClose={cancelHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={7}>
                <TextField
                  id="email"
                  variant="outlined"
                  type="email"
                  label="Sheet Code"
                  name="Sheet_Code"
                  fullWidth
                  color="primary"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={7}>
                <TextField
                  id="username"
                  label="Sheet Name"
                  variant="outlined"
                  fullWidth
                  name="Sheet Name"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler} color="primary">
          cancel
        </Button>
        <Button onClick={submitHandler} color="primary" autoFocus>
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
