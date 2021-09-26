import React, { useEffect, useState } from "react";

import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import {
  Box,
  Grid,
  Button,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import CreateSheet from "../components/modal/CreateSheetDialog";
import { toggleUserStatus } from "../store/adminDashboard-action";
import { getSheetMeta } from "../store/sheet-action";
import { AdminDashboard } from "../api/agent";
import AddExcel from "../parts/Admin/PaperGrid";
import AddUserDialog from "../components/popup/AddUserDialog";
import Backdrop from "../components/Backdrop/BackDrop";

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});
const theme = createTheme({
  typography: {
    fontSize: 18,
  },
});

function AdminDashboards() {
  const dispatch = useDispatch();
  const [moduleOpen, setModuleOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  const sheets = useSelector((state) => state.sheet.sheets);
  const [sheetNames, setSheetNames] = useState([]);

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
    dispatch(getSheetMeta());
    fetchUser();
    fetchSheetsMeta();
  }, [dispatch]);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const users = await AdminDashboard.fetchUsers();
      setRows(users.data);
      setUsers(users.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const fetchSheetsMeta = async () => {
    try {
      setLoading(true);
      const allSheets = await AdminDashboard.fetchSheetsMeta();
      setSheetNames([...allSheets.data]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const createUser = async (userDetails) => {
    setLoading(true);
    try {
      const response = await AdminDashboard.createUser(userDetails);
      console.log(response);
      const users = await AdminDashboard.fetchUsers();
      setRows(users.data);
      setUsers(users.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const createNewSheet = async (sheetMetaDetails) => {
    setLoading(true);
    try {
      const response = await AdminDashboard.setNewSheet(sheetMetaDetails);
      console.log(response);
      const allSheets = await AdminDashboard.fetchSheetsMeta();
      console.log(allSheets);
      dispatch(getSheetMeta());
      setSheetNames([...allSheets.data]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <Box p={5}>
      <Grid item xs={10}>
        <Grid container direction="row" alignContent="center" spacing={4}>
          <AddExcel />
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
            <Button
              variant="contained"
              // color="secondary"
              className={classes.button}
              onClick={handleOpen}
            >
              ADD NEW SHEET
            </Button>
          </Grid>
          <AddUserDialog
            open={moduleOpen}
            handleClose={handleModuleClose}
            userRegisterHandler={createUser}
          />
          <CreateSheet
            submitHandler={sheetDataSubmitHandler}
            cancelHandler={sheetDataCancelHandler}
            isOpen={open}
            createNewSheet={createNewSheet}
          />
        </Grid>
      </Grid>
      <ThemeProvider theme={theme}>
        <div style={{}}>
          <Box pt={5}>
            <Paper>
              <SearchBar
                placeholder="🔎 Search by username"
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Username</TableCell>
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
                          <TableCell align="left"> {row.username}</TableCell>
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
                </Table>
              </TableContainer>{" "}
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
            </Paper>
          </Box>
        </div>
      </ThemeProvider>
      <div>
        <h1>Sheets In System </h1>
      </div>
      {sheetNames.map((sheet) => (
        <>
          <h3>{sheet.sheet_name}</h3>
        </>
      ))}
      <br />
      {Loading && <Backdrop message="Admin Dashboard 🤵  Loading" show={true} />}
    </Box>
  );
}

export default AdminDashboards;
