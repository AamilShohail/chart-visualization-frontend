import React, { useEffect, useState } from "react";
import { AdminDashboard } from "../api/agent";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { Container } from "semantic-ui-react";
import { toggleUserStatus } from "../store/adminDashboard-action";
import CreateSheet from "../components/modal/CreateSheetDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";

import AdminGrid from "../parts/Admin/PaperGrid";
import AddUserDialog from "../components/popup/AddUserDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const theme = createTheme({
  typography: {
    fontSize: 18,
  },
});

function AdminDashboards() {
  const [moduleOpen, setModuleOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);

  const requestSearch = (searchedVal) => {
    const filteredRows = users.filter((row) => {
      return row.username.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const handleOpen = () => {
    //console.log("handle open");
    setOpen(true);
  };

  const sheetDataSubmitHandler = () => {
    //console.log("sheet submit");
    setOpen(false);
  };
  const sheetDataCancelHandler = () => {
    //console.log("sheet cancel");
    setOpen(false);
  };
  const handleModuleClick = () => {
    setModuleOpen(true);
  };
  const handleModuleClose = () => {
    setModuleOpen(false);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const editItem = (user) => toggleUserStatus(user);
  const BlockIcon = (user) => <button onClick={() => editItem(user)}>Block</button>;
  const ActivateIcon = (user) => <button onClick={() => editItem(user)}>Activate</button>;

  useEffect(() => {
    //console.log("Admin Dashboard mounted");
    fetchUser();
  }, []);
  const fetchUser = async () => {
    setLoading(true);
    const users = await AdminDashboard.fetchUsers();
    //console.log(users.data);
    setRows(users.data);
    setUsers(users.data);
    setLoading(false);
  };
  return (
    <Box p={5}>
      <AdminGrid />
      <Grid item xs={10}>
        <Grid container direction="row" alignContent="center" spacing={4}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleModuleClick}
            >
              ADD NEW USER
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.button} onClick={handleOpen}>
              ADD NEW SHEET
            </Button>
          </Grid>
          <AddUserDialog open={moduleOpen} handleClose={handleModuleClose} />
          <CreateSheet
            submitHandler={sheetDataSubmitHandler}
            cancelHandler={sheetDataCancelHandler}
            isOpen={open}
          />
        </Grid>
      </Grid>
      <ThemeProvider theme={theme}>
        <Box pt={5}>
          <Paper>
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Role</TableCell>
                    <TableCell align="left">Current Status</TableCell>
                    <TableCell align="left"> </TableCell>
                  </TableRow>
                </TableHead>
                {!Loading && (
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.userId}>
                        <TableCell component="th" scope="row">
                          {row.username}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.roles}</TableCell>
                        <TableCell align="left">{row.active ? "Active" : "Blocked"}</TableCell>
                        <TableCell align="left">
                          {row.active ? BlockIcon(row) : ActivateIcon(row)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
                {Loading && (
                  <div
                    style={{
                      display: "flex",
                      height: "400px",
                      width: "100vw",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
              </Table>
            </TableContainer>{" "}
          </Paper>
        </Box>
      </ThemeProvider>
      <br />
    </Box>
  );
}

export default AdminDashboards;
