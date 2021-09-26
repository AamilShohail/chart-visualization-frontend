import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card, CardActionArea, CardContent } from "@material-ui/core";
import { Typography } from "antd";
import DropzoneDialogPopup from "../../components/drag'n'drop/DropzoneArea";
import { Link } from "react-router-dom";
import AddUserDialog from "../../components/popup/AddUserDialog";
import { ToastContainer, toast } from "react-toastify";

import { useSelector } from "react-redux";
import { isSubset } from "../../helpers/helper";
import { uploadSheets } from "../../store/adminDashboard-action";
import Alert from "../../components/alert/Alert";
import { cssTransition } from "react-toastify";
import Backdrop from "../../components/Backdrop/BackDrop";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root1: {
    marginTop: "0px",
    marginBottom: "25px",
    marginRight: "30px",
    width: "100%",
    minHeight: "53vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  Cardroot: {
    maxWidth: 345,
    width: 300,
    height: 150,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  heading: {
    marginLeft: theme.spacing(5),
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  button: {
    marginRight: theme.spacing(5),
  },
}));

export default function AutoGrid() {
  const sheets = useSelector((state) => state.sheet.sheets);
  const [isNameError, setIsNameError] = useState(false);
  const [Loading, setLoading] = useState(false);

  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const Zoom = cssTransition({
    enter: "zoomIn",
    exit: "zoomOut",
    appendPosition: false,
    collapse: true,
    collapseDuration: 300,
  });
  const uploadSheet = async (file) => {
    //console.log(file, "start");
    setLoading(true);
    let namesUploaded = [];
    let namesSheet = [];
    file.forEach((f) => namesUploaded.push(f.name.split(".")[0]));
    sheets.forEach((s) => namesSheet.push(s.sheet_name));
    //isError if there is error
    const isNoError = isSubset(namesSheet, namesUploaded);
    setIsNameError(isNoError);
    if (!isNoError) {
      //console.log(" Sheet name error - check name of your sheets with system sheets");
      toast("🧐 Sheet name error - check name of your sheets with system sheets", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    //console.log("proceed");
    setOpenPopup(false);
    const newFile = [];
    file.forEach((f) => {
      sheets.forEach((s) => {
        if (f.name.split(".")[0] === s.sheet_name) {
          newFile.push({ file: f, id: s.id });
        }
      });
    });
    const response = await uploadSheets(newFile);
    setLoading(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={() => setOpenPopup(true)}>
          Add Excel File
        </Button>
      </div>
      {openPopup && (
        <DropzoneDialogPopup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          uploadSheet={uploadSheet}
          isError={isNameError}
        />
      )}
      {Loading && <Backdrop message="Uploading Sheets 📤 ๛..." show={true} />}
      <ToastContainer
        position="bottom-left"
        autoClose={15000}
        transition={Zoom}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
