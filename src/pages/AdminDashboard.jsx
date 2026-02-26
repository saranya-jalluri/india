import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingContent: 0,
    publishedContent: 0,
    totalBookings: 0
  })

  // Load stats from localStorage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("loggedUsers")) || []
    const pending = JSON.parse(localStorage.getItem("pendingMonuments")) || []
    const published = JSON.parse(localStorage.getItem("publishedMonuments")) || []
    const bookings = JSON.parse(localStorage.getItem("guideBookings")) || []

    setStats({
      totalUsers: users.length,
      pendingContent: pending.length,
      publishedContent: published.length + 12, // 12 static monuments
      totalBookings: bookings.length
    })
  }, [])

  return (
    <div style={containerStyle}>

      {/* Top Navbar */}
      <div style={navStyle}>
        <div>
          <h2>👑 Admin Panel</h2>
          <p style={{ fontSize: "12px", opacity: 0.7, margin: 0 }}>
            Welcome, {localStorage.getItem("username") || "Admin"}
          </p>
        </div>
        <button onClick={() => navigate("/")} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* Dashboard Content */}
      <div style={{ padding: "60px" }}>

        {/* Stats Overview */}
        <div style={statsGrid}>
          <div style={{ ...statCard, borderColor: "#d4af37" }}>
            <div style={statIcon}>👥</div>
            <h3 style={statNumber}>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
          <div style={{ ...statCard, borderColor: "#f4d03f" }}>
            <div style={statIcon}>📝</div>
            <h3 style={statNumber}>{stats.pendingContent}</h3>
            <p>Pending Approvals</p>
          </div>
          <div style={{ ...statCard, borderColor: "#2e8b57" }}>
            <div style={statIcon}>🏛</div>
            <h3 style={statNumber}>{stats.publishedContent}</h3>
            <p>Published Monuments</p>
          </div>
          <div style={{ ...statCard, borderColor: "#4169e1" }}>
            <div style={statIcon}>📅</div>
            <h3 style={statNumber}>{stats.totalBookings}</h3>
            <p>Tour Bookings</p>
          </div>
        </div>

        <h3 style={sectionTitle}>
          Administrative Controls
        </h3>

        <div style={gridStyle}>

          <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={cardIcon}>👥</div>
            <h4>Manage Users</h4>
            <p>View, edit or remove registered users.</p>
            <button
              style={btnStyle}
              onClick={() => navigate("/manage-users")}
            >
              View Users
            </button>
          </div>

          <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={cardIcon}>🏛</div>
            <h4>Manage Monuments</h4>
            <p>View all heritage monuments and content.</p>
            <button
              style={btnStyle}
              onClick={() => navigate("/explore")}
            >
              View Content
            </button>
          </div>

<div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={cardIcon}>💬</div>
            <h4>Monitor Discussions</h4>
            <p>Approve or remove inappropriate comments.</p>
            <button
              style={btnStyle}
              onClick={() => navigate("/admin-discussion")}
            >
              View Discussions
            </button>
          </div>

          <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={cardIcon}>✔</div>
            <h4>Content Approval</h4>
            <p>Review and approve submitted content.</p>
            {stats.pendingContent > 0 && (
              <span style={badge}>{stats.pendingContent} new</span>
            )}
            <button
              style={btnStyle}
              onClick={() => navigate("/approval")}
            >
              Review Submissions
            </button>
          </div>

          <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={cardIcon}>🎥</div>
            <h4>Virtual Tours</h4>
            <p>Manage virtual tour content and videos.</p>
            <button
              style={btnStyle}
              onClick={() => navigate("/tour")}
            >
              Manage Tours
            </button>
          </div>

          <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={cardIcon}>🧭</div>
            <h4>Guide Bookings</h4>
            <p>View and manage tour guide bookings.</p>
            <button
              style={btnStyle}
              onClick={() => navigate("/guide")}
            >
              View Bookings
            </button>
          </div>

        </div>

        {/* Quick Info */}
        <div style={infoSection}>
          <h4 style={{ color: "#d4af37", marginBottom: "15px" }}>💡 Admin Tips</h4>
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8", opacity: 0.8 }}>
            <li>Review pending content daily to keep the platform updated</li>
            <li>Monitor discussions to ensure community guidelines are followed</li>
            <li>Use "gudia" account for special administrative access</li>
            <li>Approved monuments automatically appear on the Explore page</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

/* Temple Theme Styles */

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

const logoutBtn = {
  padding: "8px 18px",
  backgroundColor: "#d4af37",
  color: "black",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
}

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "25px",
  marginBottom: "50px"
}

const statCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid",
  textAlign: "center",
  backdropFilter: "blur(8px)"
}

const statIcon = {
  fontSize: "32px",
  marginBottom: "10px"
}

const statNumber = {
  fontSize: "36px",
  color: "#d4af37",
  margin: "10px 0"
}

const sectionTitle = {
  marginBottom: "40px",
  fontSize: "28px",
  color: "#d4af37",
  textAlign: "center",
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "30px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  position: "relative"
}

const cardIcon = {
  fontSize: "36px",
  marginBottom: "15px"
}

const badge = {
  position: "absolute",
  top: "15px",
  right: "15px",
  backgroundColor: "#8b0000",
  color: "white",
  padding: "3px 10px",
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: "bold"
}

const btnStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#d4af37",
  color: "black",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
}

const infoSection = {
  marginTop: "60px",
  background: "rgba(255,255,255,0.05)",
  padding: "30px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)"
}

export default AdminDashboard
