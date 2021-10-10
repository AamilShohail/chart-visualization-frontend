import React from "react";
import * as Yup from "yup";
import { DialogContent, DialogActions, Grid, Dialog } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";

const initialValues = {
  sheetCode: "",
  sheetName: "",
};
const validationSchema = Yup.object({
  sheetCode: Yup.string("Enter sheet code").required("sheet code is Required"),
  sheetName: Yup.string("Enter sheet name").required("sheet name is Required"),
});

export default function AddSheetModal({
  submitHandler,
  isOpen,
  cancelHandler,
  createNewSheet,
}) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createNewSheet(values);
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
          <Button type="submit" color="primary" autoFocus>
            submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
