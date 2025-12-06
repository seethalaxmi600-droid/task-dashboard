import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function UserDashboard() {
  const [activePage, setActivePage] = useState(""); 
  const [tasks, setTasks] = useState([]);
const user_login_name =localStorage.getItem("user_login_name");
const user_login_id =localStorage.getItem("user_login_id");
// const storedUser = JSON.parse(localStorage.getItem("user_data"));
console.log(user_login_id);
  useEffect(() => {
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
    //   const res = await api.get("/myTasks/"+user_login_id); 
      const res = await api.get(`/my-tasks/${user_login_id}`); 
      console.log(res.data);
      setTasks(res.data || []);
    } catch (error) {
      console.error("Error loading tasks", error);
    }
  };

  const updateStatus = async (taskId, currentStatus) => {
    console.log(taskId);
    console.log(currentStatus);
    let nextStatus =
      currentStatus === "Pending"
        ? "InProgress"
        : currentStatus === "InProgress"
        ? "Completed"
        : "Completed";

    try {
      await api.patch(`/task/${taskId}/${nextStatus}`, {
      });
        // window.location.reload();
      fetchUserTasks();

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, status: nextStatus } : t
        )
      );
    } catch (error) {
      console.error("Failed to update status");
    }
  };
return (
    <div style={styles.layout}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>User Panel</h2>

        <button style={styles.button} onClick={() => setActivePage("myTasks")}>
          My Tasks
        </button>

                         <a   style={styles.button} href="/">Logout</a>

      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {activePage === "myTasks" && (
          <div>
            <h2>Assigned Tasks for {user_login_name}</h2>

            {tasks.length === 0 ? (
              <p>No tasks assigned.</p>
            ) : (
              <div style={styles.taskContainer}>
                {tasks.map((task) => (
                  <div key={task.id} style={styles.taskCard}>
                    <h3><b>Title: </b>{task.title}</h3>
                    <p><b>Description: </b>{task.description}</p>
                    <p><b>Priority: </b>{task.priority}</p>
                    <p>
                      <strong>Due:</strong>{" "}
                      {new Date(task.duedate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Status:</strong> {task.status}
                    </p>

                    {/* Status Update Button */}
                    {task.status !== "Completed" && (
                      <button
                        style={styles.statusButton}
                        onClick={() => updateStatus(task.id, task.status)}
                      >
                        Mark as{" "}
                        {task.status === "Pending"
                          ? "InProgress"
                          : "Completed"}
                      </button>
                    )}

                    {task.status === "Completed" && (
                      <span style={styles.completedTag}>✔ Completed</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!activePage && (
          <div>
            <h2>Welcome, {user_login_name }</h2>
            <p>Select an option from the left menu.</p>
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
 overflowY: "auto",
  },

  taskContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  taskCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  },

  statusButton: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  completedTag: {
    marginTop: "10px",
    display: "block",
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
};