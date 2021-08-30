import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card, CardActionArea, CardContent } from "@material-ui/core";
import { Typography } from "antd";
import DropzoneDialogPopup from "../drag'n'drop/DropzoneArea";
import { Link } from "react-router-dom";

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
          <Link to="/admin/users">
            <Grid item xs>
              <Card className={classes.Cardroot}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Users
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      description
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Link>
          <Grid item xs>
            <Card className={classes.Cardroot}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Item 2
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
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
                  <Typography variant="body2" color="textSecondary" component="p">
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
