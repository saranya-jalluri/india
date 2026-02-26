import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function EnthusiastDashboard() {
  const navigate = useNavigate()
  const [myBookings, setMyBookings] = useState([])

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("userBookings")) || []
    setMyBookings(bookings)
  }, [])

  const getStatusStyle = (status) => {
    if (status === "Approved") return { backgroundColor: "#2e8b57" }
    if (status === "Rejected") return { backgroundColor: "#8b0000" }
    return { backgroundColor: "#d4af37", color: "black" }
  }

  return (
    <div style={containerStyle}>
      <div style={navStyle}>
        <h2>🌏 Cultural Enthusiast Panel</h2>
        <button onClick={() => navigate("/")} style={logoutBtn}>Logout</button>
      </div>

      <div style={{ padding: "60px" }}>
        <h3 style={sectionTitle}>Explore India's Timeless Heritage</h3>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <h4>🏛 Explore Monuments</h4>
            <p>Discover sacred temples and architectural wonders.</p>
            <button style={btnStyle} onClick={() => navigate("/explore")}>Explore</button>
          </div>

          <div style={cardStyle}>
            <h4>🎥 Join Virtual Tours</h4>
            <p>Experience guided heritage tours online.</p>
            <button style={btnStyle} onClick={() => navigate("/tour")}>Join Tour</button>
          </div>

          <div style={cardStyle}>
            <h4>💬 Discussion Forum</h4>
            <p>Share knowledge and engage in cultural discussions.</p>
            <button style={btnStyle} onClick={() => navigate("/discussion")}>Open Forum</button>
          </div>
        </div>

        {/* My Bookings Section */}
        <div style={{ marginTop: "50px" }}>
          <h3 style={sectionTitle}>📅 My Booked Tours</h3>
          
          {myBookings.length === 0 ? (
            <div style={emptyState}>
              <p>You haven't booked any tours yet.</p>
              <button style={btnStyle} onClick={() => navigate("/explore")}>Browse Monuments</button>
            </div>
          ) : (
            <div style={bookingGrid}>
              {myBookings.map((booking, index) => (
                <div key={index} style={bookingCard}>
                  <div style={bookingHeader}>
                    <h4 style={{ color: "#d4af37", margin: 0 }}>{booking.monument}</h4>
                    <span style={{ ...statusBadge, ...getStatusStyle(booking.status) }}>{booking.status}</span>
                  </div>
                  <div style={bookingBody}>
                    <p><strong>📍 Location:</strong> {booking.location}</p>
                    <p><strong>📅 Date:</strong> {booking.date}</p>
                    <p><strong>🕐 Time:</strong> {booking.time}</p>
                    <p><strong>📞 Contact:</strong> {booking.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const containerStyle = { minHeight: "100vh", background: "linear-gradient(to bottom, #1a1a1a, #2c2c2c)", color: "white", fontFamily: "Georgia, serif" }
const navStyle = { backgroundColor: "#111", padding: "20px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #d4af37" }
const sectionTitle = { marginBottom: "40px", fontSize: "28px", color: "#d4af37", textAlign: "center" }
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }
const cardStyle = { background: "rgba(255,255,255,0.05)", padding: "30px", borderRadius: "15px", border: "1px solid rgba(212,175,55,0.3)", backdropFilter: "blur(8px)", boxShadow: "0 8px 25px rgba(0,0,0,0.4)", transition: "transform 0.3s ease" }
const btnStyle = { marginTop: "20px", padding: "10px 20px", backgroundColor: "#d4af37", color: "black", border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }
const logoutBtn = { padding: "8px 18px", backgroundColor: "#d4af37", color: "black", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }
const emptyState = { textAlign: "center", padding: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "15px", border: "1px solid rgba(212,175,55,0.3)" }
const bookingGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }
const bookingCard = { background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "15px", border: "1px solid rgba(212,175,55,0.3)", backdropFilter: "blur(8px)", boxShadow: "0 8px 25px rgba(0,0,0,0.4)" }
const bookingHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }
const bookingBody = { fontSize: "14px" }
const statusBadge = { padding: "5px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "bold" }

export default EnthusiastDashboard
