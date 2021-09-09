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
import { Box,Grid,Typography,Button} from "@material-ui/core";
import { Container } from "semantic-ui-react";
import { toggleUserStatus } from "../store/adminDashboard-action";

import AdminGrid from "../parts/Admin/PaperGrid";
import AddUserDialog from "../components/popup/AddUserDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AdminDashboards() {
  const [moduleOpen, setModuleOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const requestSearch = (searchedVal) => {
    const filteredRows = users.filter((row) => {
      return row.username.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
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
    console.log("Admin Dashboard mounted");
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const users = await AdminDashboard.fetchUsers();
    console.log(users.data);
    setRows(users.data);
    setUsers(users.data);
  };
  return (
    <Box p={5}>
      <AdminGrid />
        <Grid item xs={10}>
          <Grid container direction="row" justify="space-between" alignContent="center" spacing={4}>
            <Grid item>
              <Typography variant="button" align="left" color="primary" className={classes.heading}>
                Add User Information
              </Typography>
            </Grid>
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
            <AddUserDialog open={moduleOpen} handleClose={handleModuleClose} />
          </Grid>
        </Grid>
      
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
            </Table>
          </TableContainer>{" "}
        </Paper>
      </Box>
      <br />
    </Box>
  );
}

export default AdminDashboards;
