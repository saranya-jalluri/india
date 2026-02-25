import { useEffect, useState } from "react"

function ManageUsers() {
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

  return (
    <div style={containerStyle}>
      <div style={{ padding: "60px" }}>

        <h2 style={titleStyle}>
          👥 User Management Panel ({users.length})
        </h2>

        {users.map((user, index) => (
          <div key={index} style={cardStyle}>
            <div style={headerRow}>
              <h3 style={{ margin: 0 }}>{user.username}</h3>
              <span style={getStatusStyle(user.status)}>
                {user.status}
              </span>
            </div>

            <p><strong>Role:</strong> {user.role}</p>
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

/* ===== New Royal Maroon Theme ===== */

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #3b0a1a, #1a0a12)",
  color: "white",
  fontFamily: "Georgia, serif",
}

const titleStyle = {
  color: "#f4d03f",
  marginBottom: "40px",
}

const cardStyle = {
  background: "rgba(255,255,255,0.07)",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid rgba(244,208,63,0.4)",
  marginBottom: "25px",
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