import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function GuideDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState("All")

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

  /* ===== Calculate Stats ===== */
  const pendingCount = bookings.filter(b => b.status === "Pending").length
  const approvedCount = bookings.filter(b => b.status === "Approved").length
  const rejectedCount = bookings.filter(b => b.status === "Rejected").length

  /* ===== Filter Bookings ===== */
  const filteredBookings = filter === "All" 
    ? bookings 
    : bookings.filter(b => b.status === filter)

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

  /* ===== Get unique monuments ===== */
  const monuments = [...new Set(bookings.map(b => b.monument))]

  return (
    <div style={containerStyle}>

      {/* ===== Navbar ===== */}
      <div style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button onClick={() => navigate("/")} style={backBtn}>
            ← Back
          </button>
          <h2>🧭 Tour Guide Management</h2>
        </div>
        <button onClick={() => navigate("/")} style={logoutBtn}>
          Logout
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        {/* Stats Overview */}
        <div style={statsGrid}>
          <div style={{ ...statCard, borderColor: "#d4af37" }}>
            <h3 style={{ color: "#d4af37", fontSize: "32px", margin: "0" }}>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>
          <div style={{ ...statCard, borderColor: "#f4d03f" }}>
            <h3 style={{ color: "#f4d03f", fontSize: "32px", margin: "0" }}>{pendingCount}</h3>
            <p>Pending</p>
          </div>
          <div style={{ ...statCard, borderColor: "#2e8b57" }}>
            <h3 style={{ color: "#2e8b57", fontSize: "32px", margin: "0" }}>{approvedCount}</h3>
            <p>Approved</p>
          </div>
          <div style={{ ...statCard, borderColor: "#8b0000" }}>
            <h3 style={{ color: "#8b0000", fontSize: "32px", margin: "0" }}>{rejectedCount}</h3>
            <p>Rejected</p>
          </div>
        </div>

        {/* Filter Section */}
        <div style={filterSection}>
          <label style={{ marginRight: "15px", color: "#d4af37" }}>Filter by Status:</label>
          <select 
            style={filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Bookings</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <span style={countBadge}>
            Showing {filteredBookings.length} bookings
          </span>
        </div>

        <h3 style={sectionTitle}>
          Visitor Booking Requests ({bookings.length})
        </h3>

        {filteredBookings.length === 0 ? (
          <div style={emptyState}>
            <p>No bookings found for the selected filter.</p>
          </div>
        ) : (
          filteredBookings.map((booking, index) => (
            <div key={index} style={cardStyle}>
              <div style={cardHeader}>
                <h4 style={{ color: "#d4af37", margin: 0 }}>
                  {booking.name}
                </h4>
                <span style={getStatusStyle(booking.status)}>
                  {booking.status}
                </span>
              </div>

              <div style={cardBody}>
                <p><strong>📍 Monument:</strong> {booking.monument}</p>
                <p><strong>📅 Date:</strong> {booking.date}</p>
              </div>

              <div style={{ marginTop: "15px" }}>
                {booking.status === "Pending" && (
                  <>
                    <button
                      style={approveBtn}
                      onClick={() => approveBooking(index)}
                    >
                      ✓ Approve
                    </button>
                    <button
                      style={rejectBtn}
                      onClick={() => rejectBooking(index)}
                    >
                      ✗ Reject
                    </button>
                  </>
                )}
                <button
                  style={deleteBtn}
                  onClick={() => deleteBooking(index)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}

        {/* Monuments Section */}
        {monuments.length > 0 && (
          <div style={{ marginTop: "50px" }}>
            <h3 style={sectionTitle}>Assigned Monuments</h3>
            <div style={monumentGrid}>
              {monuments.map((monument, index) => (
                <div key={index} style={monumentCard}>
                  <h4 style={{ color: "#d4af37" }}>{monument}</h4>
                  <p style={{ fontSize: "13px", opacity: 0.8 }}>
                    {bookings.filter(b => b.monument === monument).length} booking(s)
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

/* ===== Status Color Styling ===== */
const getStatusStyle = (status) => {
  if (status === "Approved") {
    return {
      padding: "5px 12px",
      backgroundColor: "#2e8b57",
      borderRadius: "15px",
      fontSize: "12px",
      fontWeight: "bold"
    }
  }
  if (status === "Rejected") {
    return {
      padding: "5px 12px",
      backgroundColor: "#8b0000",
      borderRadius: "15px",
      fontSize: "12px",
      fontWeight: "bold"
    }
  }
  return {
    padding: "5px 12px",
    backgroundColor: "#d4af37",
    color: "black",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "bold"
  }
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

const backBtn = {
  padding: "8px 18px",
  backgroundColor: "transparent",
  color: "#d4af37",
  border: "1px solid #d4af37",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
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

const sectionTitle = {
  marginBottom: "10px",
  color: "#d4af37",
}

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
}

const statCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid",
  textAlign: "center",
}

const filterSection = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
  marginBottom: "30px",
  flexWrap: "wrap"
}

const filterSelect = {
  padding: "10px 20px",
  borderRadius: "25px",
  border: "1px solid rgba(212,175,55,0.4)",
  backgroundColor: "rgba(0,0,0,0.4)",
  color: "white",
  fontSize: "14px",
  cursor: "pointer"
}

const countBadge = {
  padding: "8px 15px",
  backgroundColor: "rgba(212,175,55,0.2)",
  borderRadius: "20px",
  fontSize: "13px",
  color: "#d4af37"
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

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px"
}

const cardBody = {
  fontSize: "14px",
}

const approveBtn = {
  padding: "8px 18px",
  backgroundColor: "#2e8b57",
  color: "white",
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

const emptyState = {
  textAlign: "center",
  padding: "40px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)"
}

const monumentGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
}

const monumentCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  textAlign: "center"
}

export default GuideDashboard
