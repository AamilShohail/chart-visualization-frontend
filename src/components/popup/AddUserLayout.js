import {Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import * as Yup from "yup";

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
});

const roles = [
    {
        value: 'ROLE_ADMIN',
        label: 'ROLE_ADMIN',
    },
    {
        value: 'ROLE_USER',
        label: 'ROLE_USER',
    },
];

function AddUserLayout(props) {
    const [role, setRole] = React.useState('EUR');
    const {formik} = props;
    const classes = useStyles();
    const handleChange = (event) => {
        setRole(event.target.value);
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container direction='row' spacing={1}>
                        <Grid item xs={5}>
                            <Typography color='secondary' align='left' variant="h4" gutterBottom>
                                E-mail
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>

                            <TextField id='email'
                                       variant='outlined'
                                       type='email'
                                       label='E-mail'
                                       name='email'
                                       fullWidth
                                       color='primary'
                                       onBlur={formik.handleBlur}
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       error={formik.touched.email && Boolean(formik.errors.email)}
                                       helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' spacing={1}>
                        <Grid item xs={5}>
                            <Typography variant="h4" gutterBottom color='secondary' align='left'>
                                Username
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField id="username" label="Username" variant="outlined" fullWidth
                                       name='username'
                                       onBlur={formik.handleBlur}
                                       value={formik.values.username}
                                       onChange={formik.handleChange}
                                       error={formik.touched.username && Boolean(formik.errors.username)}
                                       helperText={formik.touched.username && formik.errors.username}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' spacing={1}>
                        <Grid item xs={5}>
                            <Typography variant="h4" gutterBottom color='secondary' align='left'>
                                Role
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField id="roles" label="roles" variant="outlined" fullWidth select name="roles"
                                       onBlur={formik.handleBlur}
                                       value={formik.values.roles}
                                       onChange={formik.handleChange}
                                       error={formik.touched.roles && Boolean(formik.errors.roles)}
                                       helperText={formik.touched.roles && formik.errors.roles}
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default AddUserLayout;
