import React, { useEffect, useState } from "react";
import { AdminDashboard } from "../api/agent";
import { useSelector } from "react-redux";

function AdminDashboards() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    console.log("userfetch");
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const users = await AdminDashboard.fetchUsers();
    console.log(users.data);
    setUsers(users.data);
  };
  return (
    <div style={{ padding: "10px", background: "white", height: "100vh" }}>
    <h1>Users</h1>
      {Users.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
}

export default AdminDashboards;

function UserCard({ user }) {
  const isLight = useSelector((state) => state.ui.themeIsLight);
  return (
    <div
      style={{
        width: "90%",
        height: "90px",
        backgroundColor: isLight ? "white" : "#2A2E35",
        color: isLight ? "#2A2E35" : "#fff",
        boxShadow: isLight ? "5px 5px 5px  #aaaaaa" : "5px 5px 5px  #000",
        borderRadius: "10px",
        margin: "15px 10px",
        transition: "background 500ms ease-in-out, color 1000ms ease-in-out",
        display: "flex",
        justifyContent: "space-between",
        alignItems:"center"
      }}
    >
      <div style={{marginLeft:"30px"}}>
        <h3>{user.username}</h3>
      </div>
      <p>{user.email}</p>
      <div style={{marginRight:"20px"}}>
        <p>Status: {user.active ? "Active" : "Not Active"}</p>
        <button style={{background:'red',color:"white",padding:"5px",borderRadius:"8px"}}>{user.active ? `Block ` : "UnBlock"}</button>
      </div>
    </div>
  );
}
