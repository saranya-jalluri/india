import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ManageUsers() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  /* ===== Load or Create Demo Users ===== */
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("loggedUsers"))

    if (!stored || stored.length === 0) {
      const demoUsers = [
        {
          username: "admin",
          role: "Admin",
          loginTime: "24 Feb 2026, 09:30 AM",
          status: "Active"
        },
        {
          username: "gudia",
          role: "Admin (Super)",
          loginTime: "24 Feb 2026, 08:00 AM",
          status: "Active"
        },
        {
          username: "rahul123",
          role: "Cultural Enthusiast",
          loginTime: "24 Feb 2026, 10:15 AM",
          status: "Active"
        },
        {
          username: "creator01",
          role: "Content Creator",
          loginTime: "23 Feb 2026, 04:40 PM",
          status: "Active"
        },
        {
          username: "guide_krishna",
          role: "Tour Guide",
          loginTime: "23 Feb 2026, 06:00 PM",
          status: "Active"
        }
      ]

      localStorage.setItem("loggedUsers", JSON.stringify(demoUsers))
      setUsers(demoUsers)
    } else {
      setUsers(stored)
    }
  }, [])

  /* ===== Remove User ===== */
  const removeUser = (index) => {
    const updated = users.map((u, i) =>
      i === index ? { ...u, status: "Removed" } : u
    )

    setUsers(updated)
    localStorage.setItem("loggedUsers", JSON.stringify(updated))
  }

  /* ===== Stats ===== */
  const activeCount = users.filter(u => u.status === "Active").length

  return (
    <div style={containerStyle}>
      
      {/* Navbar */}
      <div style={navStyle}>
        <h2>👥 User Management</h2>
        <button onClick={() => navigate("/admin")} style={backBtn}>
          ← Back to Admin
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        {/* Stats */}
        <div style={statsRow}>
          <div style={statCard}>
            <h3 style={{ color: "#d4af37", fontSize: "32px", margin: "0" }}>{users.length}</h3>
            <p>Total Users</p>
          </div>
          <div style={statCard}>
            <h3 style={{ color: "#2e8b57", fontSize: "32px", margin: "0" }}>{activeCount}</h3>
            <p>Active</p>
          </div>
        </div>

        <h2 style={titleStyle}>
          👥 User Management Panel ({users.length})
        </h2>

        <div style={listContainer}>
          {users.map((user, index) => (
            <div key={index} style={cardStyle}>
              <div style={headerRow}>
                <div>
                  <h3 style={{ margin: 0, color: "#fff" }}>{user.username}</h3>
                  <span style={roleBadge(user.role)}>{user.role}</span>
                </div>
                <span style={getStatusStyle(user.status)}>
                  {user.status}
                </span>
              </div>

              <p><strong>Last Login:</strong> {user.loginTime}</p>

              {user.status !== "Removed" && (
                <button
                  style={deleteBtn}
                  onClick={() => removeUser(index)}
                >
                  Remove User
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

/* ===== Status Badge Styling ===== */
const getStatusStyle = (status) => {
  if (status === "Active") {
    return {
      backgroundColor: "#2e8b57",
      padding: "4px 12px",
      borderRadius: "15px",
      fontSize: "12px"
    }
  }

  return {
    backgroundColor: "#8b0000",
    padding: "4px 12px",
    borderRadius: "15px",
    fontSize: "12px"
  }
}

/* ===== Role Badge Styling ===== */
const roleBadge = (role) => {
  if (role.includes("Admin")) {
    return {
      display: "inline-block",
      marginTop: "5px",
      padding: "3px 10px",
      backgroundColor: "rgba(212,175,55,0.3)",
      borderRadius: "12px",
      fontSize: "11px",
      color: "#d4af37"
    }
  } else if (role.includes("Creator")) {
    return {
      display: "inline-block",
      marginTop: "5px",
      padding: "3px 10px",
      backgroundColor: "rgba(65,105,225,0.3)",
      borderRadius: "12px",
      fontSize: "11px",
      color: "#4169e1"
    }
  } else if (role.includes("Guide")) {
    return {
      display: "inline-block",
      marginTop: "5px",
      padding: "3px 10px",
      backgroundColor: "rgba(255,99,71,0.3)",
      borderRadius: "12px",
      fontSize: "11px",
      color: "#ff6347"
    }
  }
  return {
    display: "inline-block",
    marginTop: "5px",
    padding: "3px 10px",
    backgroundColor: "rgba(46,139,87,0.3)",
    borderRadius: "12px",
    fontSize: "11px",
    color: "#2e8b57"
  }
}

/* ===== New Royal Maroon Theme ===== */

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #3b0a1a, #1a0a12)",
  color: "white",
  fontFamily: "Georgia, serif",
}

const navStyle = {
  backgroundColor: "#111",
  padding: "20px 60px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #d4af37",
}

const backBtn = {
  padding: "8px 18px",
  backgroundColor: "transparent",
  color: "#d4af37",
  border: "1px solid #d4af37",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
}

const statsRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px"
}

const statCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px 35px",
  borderRadius: "15px",
  border: "1px solid rgba(244,208,63,0.4)",
  textAlign: "center"
}

const titleStyle = {
  color: "#f4d03f",
  marginBottom: "30px",
}

const listContainer = {
  display: "grid",
  gap: "20px"
}

const cardStyle = {
  background: "rgba(255,255,255,0.07)",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid rgba(244,208,63,0.4)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.5)"
}

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px"
}

const deleteBtn = {
  marginTop: "15px",
  padding: "8px 18px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold"
}

export default ManageUsers
