import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card, CardActionArea, CardContent } from "@material-ui/core";
import { Typography } from "antd";
import DropzoneDialogPopup from "../../components/drag'n'drop/DropzoneArea";
import { Link } from "react-router-dom";
import AddUserDialog from "../../components/popup/AddUserDialog";

import { useSelector } from "react-redux";
import { isSubset } from "../../helpers/helper";
import { uploadSheets } from "../../store/adminDashboard-action";

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
  const [moduleOpen, setModuleOpen] = useState(false);
  const sheets = useSelector((state) => state.sheet.sheets);

  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const handleModuleClick = () => {
    setModuleOpen(true);
  };
  const handleModuleClose = () => {
    setModuleOpen(false);
  };

  const uploadSheet = async (file) => {
    console.log(file, "start");
    let namesUploaded = [];
    let namesSheet = [];
    file.forEach((f) => namesUploaded.push(f.name.split(".")[0]));
    sheets.forEach((s) => namesSheet.push(s.sheet_name));
    //isError if there is error
    const isNoError = isSubset(namesSheet, namesUploaded);
    if (!isNoError) {
      console.log("Sheet name error - chk name of your sheets with system sheets")
      return};
    console.log("proceed");
    const newFile = [];
    file.forEach((f) => {
      sheets.forEach((s) => {
        if (f.name.split(".")[0] === s.sheet_name) {
          newFile.push({ file: f, id: s.id });
        }
      });
    });
    console.log({ newFile });
    const re = await uploadSheets(newFile);
    console.log("re", re);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Card className={classes.Cardroot}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    File Upload
                  </Typography>
                  <p>Hello</p>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpenPopup(true)}
                    >
                      Add Excel File
                    </Button>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
      <DropzoneDialogPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        uploadSheet={uploadSheet}
      />
    </>
  );
}
