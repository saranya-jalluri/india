import { useState } from "react"

function CreatorDashboard() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [tourLink, setTourLink] = useState("")
  const [monuments, setMonuments] = useState([])

  const addMonument = () => {
    if (!title || !description) return

    const newMonument = {
      title,
      location,
      description,
      image,
      tourLink,
    }

    setMonuments([...monuments, newMonument])

    setTitle("")
    setLocation("")
    setDescription("")
    setImage("")
    setTourLink("")
  }

  const deleteMonument = (index) => {
    const updated = monuments.filter((_, i) => i !== index)
    setMonuments(updated)
  }

  return (
    <div style={containerStyle}>

      {/* Top Bar */}
      <div style={navStyle}>
        <h2>🎨 Content Creator Panel</h2>
      </div>

      <div style={{ padding: "60px" }}>

        {/* Form Section */}
        <div style={formCard}>
          <h3 style={sectionTitle}>Add New Monument</h3>

          <input
            style={inputStyle}
            type="text"
            placeholder="Monument Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            style={inputStyle}
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            style={inputStyle}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            style={inputStyle}
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            style={inputStyle}
            type="text"
            placeholder="Virtual Tour YouTube Link"
            value={tourLink}
            onChange={(e) => setTourLink(e.target.value)}
          />

          <button style={btnStyle} onClick={addMonument}>
            Add Monument
          </button>
        </div>

        {/* Display Section */}
        <div style={{ marginTop: "60px" }}>
          <h3 style={sectionTitle}>Added Monuments</h3>

          <div style={gridStyle}>
            {monuments.map((m, index) => (
              <div key={index} style={cardStyle}>
                {m.image && (
                  <img
                    src={m.image}
                    alt={m.title}
                    style={imageStyle}
                  />
                )}

                <h4 style={{ color: "#d4af37" }}>{m.title}</h4>
                <p><strong>Location:</strong> {m.location}</p>
                <p>{m.description}</p>

                <button
                  style={deleteBtn}
                  onClick={() => deleteMonument(index)}
                >
                  Delete
                </button>
              </div>
            ))}
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
  borderBottom: "1px solid #d4af37",
}

const sectionTitle = {
  marginBottom: "25px",
  color: "#d4af37",
}

const formCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "35px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  backdropFilter: "blur(8px)",
  maxWidth: "650px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "12px 0",
  borderRadius: "8px",
  border: "1px solid rgba(212,175,55,0.4)",
  backgroundColor: "rgba(0,0,0,0.3)",
  color: "white",
}

const btnStyle = {
  marginTop: "15px",
  padding: "12px 25px",
  backgroundColor: "#d4af37",
  color: "black",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
}

const deleteBtn = {
  marginTop: "15px",
  padding: "8px 15px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
}

const imageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "15px",
}

export default CreatorDashboard