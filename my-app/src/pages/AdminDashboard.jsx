import React, { useState } from "react";
import CreateUser from "../features/admin/CreateUser";
import CreateTask from "../features/admin/CreateTask";
import ViewTask from "../features/admin/ViewTask";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("");

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Admin Panel</h2>

        <button
          style={styles.button}
          onClick={() => setActivePage("createUser")}
        >
          Create User
        </button>
        <button
          style={styles.button}
          onClick={() => setActivePage("createTask")}
        >
          Create Task
        </button>
        <button
          style={styles.button}
          onClick={() => setActivePage("viewTask")}
        >
          View Tasks
        </button>

        {/* <button> */}
                  <a   style={styles.button} href="/">Logout</a>

        {/* </button> */}
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {activePage === "createUser" && <CreateUser />}
        {activePage === "createTask" && <CreateTask />}
        {activePage === "viewTask" && <ViewTask />}
        {!activePage && (
          <div>
            <h2>Welcome, Admin</h2>
            <p>Select an option from the left menu to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  sidebar: {
    width: "200px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  logo: {
    marginBottom: "30px",
    fontSize: "22px",
    fontWeight: "bold",
  },

  button: {
    padding: "10px 15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#34495e",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "left",
  },

  main: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#ecf0f1",
  },
};