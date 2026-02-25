import { monuments } from "../data/monuments"
import { useNavigate } from "react-router-dom"

function Explore() {
  const navigate = useNavigate()

  return (
    <div style={containerStyle}>
      <div style={{ padding: "60px" }}>

        <h2 style={titleStyle}>🏛 Explore Indian Heritage</h2>

        <div style={gridStyle}>
          {monuments.map((monument) => (
            <div key={monument.id} style={cardStyle}>

              <img
                src={monument.image}
                alt={monument.name}
                style={imageStyle}
              />

              <h3 style={cardTitle}>{monument.name}</h3>
              <p style={locationStyle}>{monument.location}</p>
              <p style={descStyle}>{monument.description}</p>

              <button
                style={btnStyle}
                onClick={() => navigate("/tour")}
              >
                Virtual Tour
              </button>

            </div>
          ))}
        </div>

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

const titleStyle = {
  textAlign: "center",
  marginBottom: "50px",
  fontSize: "32px",
  color: "#d4af37",
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "35px",
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
}

const imageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "15px",
}

const cardTitle = {
  color: "#d4af37",
  marginBottom: "5px",
}

const locationStyle = {
  fontSize: "13px",
  opacity: 0.7,
  marginBottom: "10px",
}

const descStyle = {
  fontSize: "14px",
  marginBottom: "15px",
  lineHeight: "1.5",
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
}

export default Explore