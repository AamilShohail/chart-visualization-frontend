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
import { Box } from "@material-ui/core";
import { Container } from "semantic-ui-react";

import AdminGrid from "../parts/Admin/PaperGrid";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AdminDashboards() {
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

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const editItem = (user) => console.log("test",{user});
  const BlockIcon = (user) => <button onClick={() => editItem(user)}>Block</button>;
  const ActivateIcon = (user) => <button onClick={() => editItem(user)}>Activate</button>;

  useEffect(() => {
    console.log("userfetch");
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
