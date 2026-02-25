import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function GuideDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  /* ===== Load or Create Demo Bookings ===== */
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("guideBookings"))

    if (!stored || stored.length === 0) {
      const demoBookings = [
        {
          name: "Rahul Sharma",
          monument: "Taj Mahal",
          date: "2026-03-10",
          status: "Pending"
        },
        {
          name: "Ananya Reddy",
          monument: "Charminar",
          date: "2026-03-15",
          status: "Approved"
        },
        {
          name: "Kiran Patel",
          monument: "Meenakshi Temple",
          date: "2026-03-20",
          status: "Rejected"
        },
        {
          name: "Sneha Verma",
          monument: "Hampi",
          date: "2026-03-25",
          status: "Pending"
        }
      ]

      localStorage.setItem("guideBookings", JSON.stringify(demoBookings))
      setBookings(demoBookings)
    } else {
      setBookings(stored)
    }
  }, [])

  /* ===== Approve Booking ===== */
  const approveBooking = (index) => {
    const updated = bookings.map((b, i) =>
      i === index ? { ...b, status: "Approved" } : b
    )
    setBookings(updated)
    localStorage.setItem("guideBookings", JSON.stringify(updated))
  }

  /* ===== Reject Booking ===== */
  const rejectBooking = (index) => {
    const updated = bookings.map((b, i) =>
      i === index ? { ...b, status: "Rejected" } : b
    )
    setBookings(updated)
    localStorage.setItem("guideBookings", JSON.stringify(updated))
  }

  /* ===== Delete Booking ===== */
  const deleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index)
    setBookings(updated)
    localStorage.setItem("guideBookings", JSON.stringify(updated))
  }

  /* ===== Count Stats ===== */
  const pendingCount = bookings.filter(b => b.status === "Pending").length

  return (
    <div style={containerStyle}>

      {/* ===== Navbar ===== */}
      <div style={navStyle}>
        <h2>🧭 Tour Guide Management</h2>
        <button onClick={() => navigate("/")} style={logoutBtn}>
          Logout
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        <h3 style={sectionTitle}>
          Visitor Booking Requests ({bookings.length})
        </h3>

        <p style={{ marginBottom: "30px", color: "#d4af37" }}>
          Pending Requests: {pendingCount}
        </p>

        {bookings.map((booking, index) => (
          <div key={index} style={cardStyle}>
            <h4 style={{ color: "#d4af37" }}>
              {booking.name}
            </h4>

            <p><strong>Monument:</strong> {booking.monument}</p>
            <p><strong>Date:</strong> {booking.date}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span style={getStatusStyle(booking.status)}>
                {booking.status}
              </span>
            </p>

            <div style={{ marginTop: "15px" }}>
              <button
                style={approveBtn}
                onClick={() => approveBooking(index)}
              >
                Approve
              </button>

              <button
                style={rejectBtn}
                onClick={() => rejectBooking(index)}
              >
                Reject
              </button>

              <button
                style={deleteBtn}
                onClick={() => deleteBooking(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

/* ===== Status Color Styling ===== */
const getStatusStyle = (status) => {
  if (status === "Approved")
    return { color: "lightgreen", fontWeight: "bold" }
  if (status === "Rejected")
    return { color: "red", fontWeight: "bold" }
  return { color: "#f4d03f", fontWeight: "bold" }
}

/* ===== Temple Luxury Theme ===== */

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #1a1a1a, #2c2c2c)",
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

const sectionTitle = {
  marginBottom: "10px",
  color: "#d4af37",
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  marginBottom: "25px",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)"
}

const approveBtn = {
  padding: "8px 18px",
  backgroundColor: "#d4af37",
  border: "none",
  borderRadius: "20px",
  marginRight: "10px",
  cursor: "pointer",
  fontWeight: "bold"
}

const rejectBtn = {
  padding: "8px 18px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  marginRight: "10px",
  cursor: "pointer",
  fontWeight: "bold"
}

const deleteBtn = {
  padding: "8px 18px",
  backgroundColor: "#444",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold"
}

const logoutBtn = {
  padding: "8px 18px",
  backgroundColor: "#d4af37",
  color: "black",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
}

export default GuideDashboard