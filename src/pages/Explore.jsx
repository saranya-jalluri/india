import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { monuments as staticMonuments } from "../data/monuments"

function Explore() {
  const navigate = useNavigate()
  const [allMonuments, setAllMonuments] = useState([])
  const [filter, setFilter] = useState("All")

  // Load monuments: static + published from localStorage
  useEffect(() => {
    const published = JSON.parse(localStorage.getItem("publishedMonuments")) || []
    
    // Combine static monuments with published ones
    const combined = [...staticMonuments, ...published]
    setAllMonuments(combined)
  }, [])

  // Get unique locations for filter
  const locations = ["All", ...new Set(allMonuments.map(m => m.location.split(",")[0].trim()))]

  // Filter monuments
  const filteredMonuments = filter === "All" 
    ? allMonuments 
    : allMonuments.filter(m => m.location.includes(filter))

  return (
    <div style={containerStyle}>
      
      {/* Navbar */}
      <div style={navStyle}>
        <h2>🏛 Explore Indian Heritage</h2>
        <button onClick={() => navigate(-1)} style={backBtn}>
          ← Back
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        {/* Header */}
        <div style={headerSection}>
          <h2 style={titleStyle}>🏛 Discover India's Heritage</h2>
          
          {/* Filter */}
          <div style={filterSection}>
            <label style={{ marginRight: "15px", color: "#d4af37" }}>Filter by Region:</label>
            <select 
              style={filterSelect}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <span style={countBadge}>
              Showing {filteredMonuments.length} monuments
            </span>
          </div>
        </div>

        {/* Monuments Grid */}
        <div style={gridStyle}>
          {filteredMonuments.map((monument, index) => (
            <div 
              key={monument.id || index} 
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)"
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(212,175,55,0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)"
              }}
            >
              <div style={imageContainer}>
                <img
                  src={monument.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Gol_Gumbaz.jpg/1280px-Gol_Gumbaz.jpg"}
                  alt={monument.name}
                  style={imageStyle}
                  onError={(e) => {
                    e.target.src = "https://upload.wikimedia.org/wikipedia/6/6/commons/thumbe/Gol_Gumbaz.jpg/1280px-Gol_Gumbaz.jpg"
                  }}
                />
                <div style={imageOverlay}>
                  <span style={viewCount}>👁 Explore</span>
                </div>
              </div>

              <div style={cardContent}>
                <h3 style={cardTitle}>{monument.name}</h3>
                <p style={locationStyle}>📍 {monument.location}</p>
                <p style={descStyle}>{monument.description}</p>

                <div style={cardFooter}>
                  <button
                    style={btnStyle}
                    onClick={() => navigate("/tour")}
                  >
                    🎥 Virtual Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMonuments.length === 0 && (
          <div style={emptyState}>
            <p>No monuments found for this filter.</p>
          </div>
        )}

      </div>
    </div>
  )
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

const headerSection = {
  marginBottom: "40px"
}

const titleStyle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "36px",
  color: "#d4af37",
}

const filterSection = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "35px",
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "20px",
  border: "1px solid rgba(212,175,55,0.3)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  transition: "all 0.3s ease",
  overflow: "hidden"
}

const imageContainer = {
  position: "relative",
  overflow: "hidden"
}

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "20px 20px 0 0",
}

const imageOverlay = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
  padding: "20px",
  opacity: 0,
  transition: "opacity 0.3s ease",
}

const viewCount = {
  color: "#d4af37",
  fontWeight: "bold"
}

const cardContent = {
  padding: "20px"
}

const cardTitle = {
  color: "#d4af37",
  marginBottom: "8px",
  fontSize: "20px"
}

const locationStyle = {
  fontSize: "13px",
  opacity: 0.7,
  marginBottom: "10px",
}

const descStyle = {
  fontSize: "14px",
  lineHeight: "1.5",
  marginBottom: "15px",
}

const cardFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}

const btnStyle = {
  padding: "10px 20px",
  background: "linear-gradient(90deg, #d4af37, #f4d03f)",
  color: "#000",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  transition: "transform 0.2s ease"
}

const emptyState = {
  textAlign: "center",
  padding: "60px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)"
}

export default Explore
