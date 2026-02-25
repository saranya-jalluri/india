import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      {/* NAVBAR */}
      <div style={navStyle}>
        <h2 style={{ margin: 0 }}>Indian Heritage Explorer</h2>
        <button style={navBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>

      {/* HERO SECTION */}
      <div
        style={{
          height: "100vh",
          backgroundImage:
            "url('https://www.learnreligions.com/thmb/C30kYyrwsdVMmpJQtgUfT-LR5Rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-165717552-5c5e31c0c9e77c00010a4901.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        {/* Dark Overlay */}
        <div style={overlayStyle}></div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>
            Explore India's Cultural Legacy
          </h1>

          <p style={{ fontSize: "22px", marginBottom: "30px" }}>
            Discover temples, monuments, traditions & virtual heritage tours
          </p>

          <button
            style={heroBtn}
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div style={{ padding: "80px 40px", backgroundColor: "#f4f6f9" }}>
        <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
          Platform Features
        </h2>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <h3>🏛 Explore Monuments</h3>
            <p>Discover historical places across India with detailed insights.</p>
          </div>

          <div style={cardStyle}>
            <h3>🎥 Virtual Tours</h3>
            <p>Join immersive online tours guided by cultural experts.</p>
          </div>

          <div style={cardStyle}>
            <h3>💬 Community Interaction</h3>
            <p>Engage in discussions and share knowledge about heritage.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={footerStyle}>
        © 2026 Indian Heritage Explorer | FSAD Project
      </div>

    </div>
  )
}

/* Styles */

const navStyle = {
  position: "absolute",
  width: "100%",
  padding: "20px 50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  zIndex: 3,
}

const navBtn = {
  padding: "8px 18px",
  borderRadius: "20px",
  border: "none",
  backgroundColor: "white",
  color: "#000080",
  cursor: "pointer",
  fontWeight: "bold",
}

const overlayStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}

const heroBtn = {
  padding: "15px 30px",
  fontSize: "16px",
  borderRadius: "30px",
  border: "none",
  backgroundColor: "#ff9933",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
}

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
}

const footerStyle = {
  backgroundColor: "#000080",
  color: "white",
  textAlign: "center",
  padding: "20px",
}

export default Home