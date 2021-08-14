import React, {useState} from "react";
import {
    Grid,
    makeStyles,
    Paper,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Backdrop,
} from "@material-ui/core";

import {useHistory} from "react-router-dom";
import * as Yup from "yup";
import AuthService from "./services/auth.service";
import {useFormik} from "formik";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: "column",
        justifyContent: "center",
    },
    paper: {
        width: "650px",
        height: "550px",
        marginTop: theme.spacing(15),
        marginLeft: theme.spacing(45),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    greeting: {
        marginTop: "90px",
    },
    form: {
        marginTop: "25px",
    },
    formElements: {
        width: "400px",
    },
    rem: {
        marginLeft: "-236px",
    },
    read: {
        marginTop: "30px",
        marginLeft: "25px",
    },
    head: {
        marginLeft: "-10px",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        width: "100%",
    },
}));

const validationSchema = Yup.object({
    username: Yup.string("Enter name as username")
        .required("Username is required"),
    password: Yup.string()
        .required("Password is required")
        .min(5, "Password requires minimum 5 characters"),
});
const initialValues = {username: "" || localStorage.username, password: ""};

const homeRedirect = (user) => {
    let home = "";
    user.user.authorities.map((roles) => {
        const {authority} = roles;
        console.log(authority);
        switch (authority) {
            case "ROLE_ADMIN":
                home = "/admin-home";
                break;
            case "ROLE_USER":
                home = "/user-home";
                break;
            default:
                home = "/home";
        }
    });
    return home;
};

function LoginForm(props) {
    const classes = useStyles();
    const history = useHistory();
    const checkedInitial = localStorage.username != null ? true : false;
    const [isChecked, setSetIsChecked] = useState(checkedInitial);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (isChecked) {
                localStorage.username = values.username;
            }
            setLoading(true);
            if (formik.errors.username == null && formik.errors.password == null) {
                AuthService.login(values).then(
                    (response) => {
                        const home = homeRedirect(AuthService.getCurrentUser());
                        setTimeout(history.push(`${home}`), 5000);
                        window.location.reload();
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        setLoading(false);
                        setMessage(resMessage);
                    }
                );
            } else {
                setLoading(false);
            }
        },
    });

    return (
        <div>
            <Paper elevation={2} className={classes.paper}>
                <Grid container spacing={1} className={classes.root}>
                    <Grid item className={classes.greeting}>
                        <Grid
                            container
                            spacing={2}
                            direction='column'
                            alignItems='center'
                            alignContent='center'
                            justify='center'>
                            <Grid item>
                                <Typography variant='h4' color='primary'>
                                    <b>Welcome</b>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid
                                container
                                spacing={2}
                                direction='column'
                                justify='center'
                                alignItems='center'
                                className={classes.form}>
                                <Grid item>
                                    <TextField
                                        id='username'
                                        name='username'
                                        label='Username'
                                        variant='outlined'
                                        autoFocus
                                        size='small'
                                        error={
                                            formik.touched.username && Boolean(formik.errors.username)
                                        }
                                        helperText={
                                            formik.touched.username && formik.errors.username
                                        }
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        className={classes.formElements}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        type='password'
                                        id='password'
                                        name='password'
                                        label='Password'
                                        variant='outlined'
                                        size='small'
                                        error={
                                            formik.touched.password && Boolean(formik.errors.password)
                                        }
                                        helperText={
                                            formik.touched.password && formik.errors.password
                                        }
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        className={classes.formElements}
                                    />
                                </Grid>
                                <Grid item>
                                    {message === "" ? null : (
                                        <Typography variant='body' color='inherit'>
                                            Username or password is incorrect
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item className={classes.rem}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color='primary'
                                                checked={isChecked}
                                                onChange={() => {
                                                    setSetIsChecked(!isChecked);
                                                    localStorage.removeItem("username");
                                                }}
                                            />
                                        }
                                        label={<i>Remember Me</i>}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        size='large'
                                        className={classes.formElements}
                                        disabled={loading}>
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item className={classes.read}>

                        {loading ? (
                            <Backdrop className={classes.backdrop} open={loading}>
                                <Loader
                                    type='Circles'
                                    color='rgb(24, 11, 77)'
                                    height={100}
                                    width={100}
                                />
                            </Backdrop>
                        ) : null}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default LoginForm;

