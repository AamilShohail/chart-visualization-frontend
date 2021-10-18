import Dialog from "@mui/material/Dialog";
import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PasswordResetForm from "./PasswordResetForm";
export default function ForgetPassword(props) {
  const { openPopup, setOpenPopup } = props;
  return (
    <>
      <Dialog open={openPopup} disableEscapeKeyDown>
        <DialogTitle>Reset your Password</DialogTitle>
        <DialogContent style={{ padding: 10 }}>
          <PasswordResetForm />
        </DialogContent>
        <DialogActions>
          <div style={{ margin: 0, marginLeft: 5 }}>
            <Button variant="outlined" color="success">
              SUBMIT
            </Button>
          </div>
          <Link style={{ margin: 0, marginLeft: 5 }} to="/">
            <Button
              onClose={() => setOpenPopup(false)}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
