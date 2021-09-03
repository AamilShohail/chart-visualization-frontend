import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Button, Card, CardActionArea, CardContent} from "@material-ui/core";
import {Typography} from "antd";
import DropzoneDialogPopup from "../../components/drag'n'drop/DropzoneArea";
import {Link} from "react-router-dom";
import AddUserDialog from "../../components/popup/AddUserDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    root1: {
        marginTop: "0px",
        marginBottom: "25px",
        marginRight: "30px",
        width: "100%",
        minHeight: '53vh'
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
    const handleModuleClick = () => {
        setModuleOpen(true);
    };
    const handleModuleClose = () => {
        setModuleOpen(false);
    };

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
            <div>
                <Grid container className={classes.root1} direction='column' spacing={8}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction='row'
                            justify='space-between'
                            alignContent='center'
                            spacing={4}>
                            <Grid item>
                                <Typography
                                    variant='button'
                                    align='left'
                                    color='primary'
                                    className={classes.heading}>
                                    Add User Information
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={classes.button}
                                    onClick={handleModuleClick}>
                                    ADD
                                </Button>
                            </Grid>
                            <AddUserDialog open={moduleOpen} handleClose={handleModuleClose}/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <DropzoneDialogPopup openPopup={openPopup} setOpenPopup={setOpenPopup}/>
        </>
    );
}

