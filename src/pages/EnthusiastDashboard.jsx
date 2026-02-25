import { useNavigate } from "react-router-dom"

function EnthusiastDashboard() {
  const navigate = useNavigate()

  return (
    <div style={containerStyle}>

      {/* Top Navbar */}
      <div style={navStyle}>
        <h2>🌏 Cultural Enthusiast Panel</h2>
        <button onClick={() => navigate("/")} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "60px" }}>

        <h3 style={sectionTitle}>
          Explore India's Timeless Heritage
        </h3>

        <div style={gridStyle}>

          <div style={cardStyle}>
            <h4>🏛 Explore Monuments</h4>
            <p>Discover sacred temples and architectural wonders.</p>
            <button
              style={btnStyle}
              onClick={() => navigate("/explore")}
            >
              Explore
            </button>
          </div>

          <div style={cardStyle}>
            <h4>🎥 Join Virtual Tours</h4>
            <p>Experience guided heritage tours online.</p>
            <button
              style={btnStyle}
              onClick={() => navigate("/tour")}
            >
              Join Tour
            </button>
          </div>

          <div style={cardStyle}>
            <h4>💬 Discussion Forum</h4>
            <p>Share knowledge and engage in cultural discussions.</p>
            <button
              style={btnStyle}
              onClick={() => navigate("/discussion")}
            >
              Open Forum
            </button>
          </div>

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

const sectionTitle = {
  marginBottom: "40px",
  fontSize: "28px",
  color: "#d4af37",
  textAlign: "center",
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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

const logoutBtn = {
  padding: "8px 18px",
  backgroundColor: "#d4af37",
  color: "black",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
}

export default EnthusiastDashboard