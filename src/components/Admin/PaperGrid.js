import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  MenuItem,
  InputLabel,
  Select as DropDownSelect,
} from "@material-ui/core";
import { Typography } from "antd";
import DropzoneDialogPopup from "../drag'n'drop/DropzoneArea";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  SelectCtrl: {
    margin: theme.spacing(1),
    width: 250,
    marginLeft: -2,
  },
}));
export default function AutoGrid() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

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

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        File Type Preference
                      </InputLabel>
                      <DropDownSelect
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        className={classes.SelectCtrl}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10} onClick={() => setOpenPopup(true)}>
                          Sales
                        </MenuItem>
                        <MenuItem value={20}>Income</MenuItem>
                        <MenuItem value={30}>Profit</MenuItem>
                      </DropDownSelect>
                    </FormControl>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.Cardroot}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Item 1
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    description
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.Cardroot}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Item 2
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    description
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.Cardroot}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Item 3
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    description
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
      <DropzoneDialogPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
}
