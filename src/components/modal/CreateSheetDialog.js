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

export default function AddSheetModal({ submitHandler, isOpen, cancelHandler,createNewSheet }) {
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createNewSheet(values)
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
      <form onSubmit={formik.handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={7}>
                <TextField
                  id="email"
                  variant="outlined"
                  type="text"
                  label="Sheet Code"
                  name="sheetCode"
                  fullWidth
                  color="primary"
                  value={formik.values.sheetCode}
                  onChange={formik.handleChange}
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
                  name="sheetName"
                  value={formik.values.sheetName}
                  onChange={formik.handleChange}
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
        <Button type='submit' color="primary" autoFocus>
          submit
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
}
