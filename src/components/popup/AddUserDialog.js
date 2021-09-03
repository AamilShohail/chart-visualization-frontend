import {
    Button,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    makeStyles,
    Dialog,
    Typography,
} from "@material-ui/core";
import React from "react";
import AddUserLayout from "./AddUserLayout";
import * as Yup from "yup";
import {useFormik} from "formik";
import Agent from "../../api/agent";
import {ToastContainer, toast} from "react-toastify";

const initialValues = {
    email: "",
    username: "",
    roles: "",
};

const useStyles = makeStyles((theme) => ({
    container: {
        width: "1300px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },

}));


const validationSchema = Yup.object({
    email: Yup.string("Enter user email id").required(
        "email is Required"
    ),
    username: Yup.string("Enter username").required(
        "username is Required"
    ),
    roles: Yup.string("Select Role").required(
        "Role is required"
    ),
});

function AddUserDialog(props) {
    const {open, handleClose} = props;
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            Agent.RegisterUser(values)
                .then((res) => {
                    if (res.status === 201) {
                        toast.success("User Registration Successful", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        formik.resetForm();
                    }
                })
                .catch((error) =>
                    toast.error("User Already exists", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                );
            handleClose();
            formik.setValues(initialValues);
        },
    });

    const handleCancel = () => {
        handleClose();
        formik.setValues(initialValues);
        formik.handleReset();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>
                    <Typography
                        variant='h3'
                        color='primary'
                        align='left'>
                        Add User Information
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <AddUserLayout formik={formik}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={formik.handleSubmit}
                        disabled={!formik.isValid}
                        color='primary'>
                        Register User
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer/>
        </>
    );
}

export default AddUserDialog;
