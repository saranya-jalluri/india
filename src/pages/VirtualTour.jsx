import { useNavigate } from "react-router-dom"

function VirtualTour() {
  const navigate = useNavigate()

  const tours = [
    {
      title: "Taj Mahal Virtual Tour",
      link: "https://www.youtube.com/embed/49HTIoCccDY"
    },
    {
      title: "Hampi Temple Tour",
      link: "https://www.youtube.com/embed/0GZSfBuhf6Y"
    }
    
  ]

  return (
    <div style={containerStyle}>
      
      {/* Navbar */}
      <div style={navStyle}>
        <h2>🎥 Virtual Heritage Tours</h2>
        <button onClick={() => navigate(-1)} style={backBtn}>
          ← Back
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        <h2 style={titleStyle}>🎥 Virtual Heritage Tours</h2>

        <div style={gridStyle}>
          {tours.map((tour, index) => (
            <div key={index} style={cardStyle}>
              <h3 style={{ color: "#d4af37", marginBottom: "15px" }}>
                {tour.title}
              </h3>

              <iframe
                width="100%"
                height="250"
                src={tour.link}
                title={tour.title}
                style={{ borderRadius: "10px", border: "none" }}
                allowFullScreen
              ></iframe>
            </div>
          ))}
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

const titleStyle = {
  textAlign: "center",
  marginBottom: "50px",
  fontSize: "32px",
  color: "#d4af37",
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "40px",
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
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

export default VirtualTour
