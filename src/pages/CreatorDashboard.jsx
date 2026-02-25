import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CreatorDashboard() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [tourLink, setTourLink] = useState("")
  const [submitted, setSubmitted] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)

  // Load creator's submitted content from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("creatorSubmissions")) || []
    setSubmitted(stored)
  }, [])

  // Calculate stats
  const pendingCount = submitted.filter(s => s.status === "Pending").length
  const approvedCount = submitted.filter(s => s.status === "Approved").length
  const rejectedCount = submitted.filter(s => s.status === "Rejected").length

  const addMonument = () => {
    if (!title || !description) {
      alert("Please fill in required fields (Title and Description)")
      return
    }

    const newMonument = {
      id: Date.now(),
      title,
      location,
      description,
      image: image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Gol_Gumbaz.jpg/1280px-Gol_Gumbaz.jpg",
      tourLink,
      submittedBy: localStorage.getItem("username") || "creator",
      submittedDate: new Date().toLocaleDateString(),
      status: "Pending"
    }

    // Save to creator's submissions
    const updatedSubmissions = [...submitted, newMonument]
    setSubmitted(updatedSubmissions)
    localStorage.setItem("creatorSubmissions", JSON.stringify(updatedSubmissions))

    // Add to pending for admin approval
    const pending = JSON.parse(localStorage.getItem("pendingMonuments")) || []
    const pendingItem = {
      title,
      location,
      description,
      image: newMonument.image,
      tourLink,
      submittedBy: newMonument.submittedBy,
      submittedDate: newMonument.submittedDate
    }
    localStorage.setItem("pendingMonuments", JSON.stringify([...pending, pendingItem]))

    // Clear form
    setTitle("")
    setLocation("")
    setDescription("")
    setImage("")
    setTourLink("")

    alert("Monument submitted for admin approval!")
  }

  const deleteMonument = (index) => {
    const updated = submitted.filter((_, i) => i !== index)
    setSubmitted(updated)
    localStorage.setItem("creatorSubmissions", JSON.stringify(updated))
  }

  const editMonument = (index) => {
    const item = submitted[index]
    setTitle(item.title)
    setLocation(item.location)
    setDescription(item.description)
    setImage(item.image)
    setTourLink(item.tourLink || "")
    setEditingIndex(index)
  }

  const updateMonument = () => {
    if (!title || !description) {
      alert("Please fill in required fields (Title and Description)")
      return
    }

    const updated = [...submitted]
    updated[editingIndex] = {
      ...updated[editingIndex],
      title,
      location,
      description,
      image: image || updated[editingIndex].image,
      tourLink,
      editedDate: new Date().toLocaleDateString(),
      status: "Pending"
    }
    
    setSubmitted(updated)
    localStorage.setItem("creatorSubmissions", JSON.stringify(updated))
    
    // Also update pending
    const pending = JSON.parse(localStorage.getItem("pendingMonuments")) || []
    const pendingIndex = pending.findIndex(p => p.title === updated[editingIndex].title)
    if (pendingIndex !== -1) {
      pending[pendingIndex] = {
        ...pending[pendingIndex],
        title,
        location,
        description,
        image: image || updated[editingIndex].image,
        tourLink
      }
      localStorage.setItem("pendingMonuments", JSON.stringify(pending))
    }
    
    // Clear form
    setTitle("")
    setLocation("")
    setDescription("")
    setImage("")
    setTourLink("")
    setEditingIndex(null)
    
    alert("Monument updated! It has been resubmitted for approval.")
  }

  const cancelEdit = () => {
    setTitle("")
    setLocation("")
    setDescription("")
    setImage("")
    setTourLink("")
    setEditingIndex(null)
  }

  return (
    <div style={containerStyle}>

      {/* Top Bar */}
      <div style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button onClick={() => navigate("/")} style={backBtn}>
            ← Back
          </button>
          <h2>🎨 Content Creator Panel</h2>
        </div>
        <button onClick={() => navigate("/")} style={logoutBtn}>
          Logout
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        {/* Stats Overview */}
        {submitted.length > 0 && (
          <div style={statsGrid}>
            <div style={{ ...statCard, borderColor: "#d4af37" }}>
              <h3 style={{ color: "#d4af37", fontSize: "32px", margin: "0" }}>{submitted.length}</h3>
              <p>Total Submissions</p>
            </div>
            <div style={{ ...statCard, borderColor: "#f4d03f" }}>
              <h3 style={{ color: "#f4d03f", fontSize: "32px", margin: "0" }}>{pendingCount}</h3>
              <p>Pending Review</p>
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
        )}

        {/* Form Section */}
        <div style={formCard}>
          <h3 style={sectionTitle}>
            {editingIndex !== null ? "Edit Monument Submission" : "Submit New Monument for Approval"}
          </h3>
          <p style={{ fontSize: "13px", opacity: 0.7, marginBottom: "20px" }}>
            Your submissions will be reviewed by admin before publishing to the Explore page.
          </p>

          <input
            style={inputStyle}
            type="text"
            placeholder="Monument Name *"
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
            style={{ ...inputStyle, minHeight: "100px" }}
            placeholder="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            style={inputStyle}
            type="text"
            placeholder="Image URL (optional)"
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

          <div style={{ display: "flex", gap: "10px" }}>
            <button style={btnStyle} onClick={editingIndex !== null ? updateMonument : addMonument}>
              {editingIndex !== null ? "Update & Resubmit" : "Submit for Approval"}
            </button>
            
            {editingIndex !== null && (
              <button style={cancelBtn} onClick={cancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Display Section */}
        <div style={{ marginTop: "60px" }}>
          <h3 style={sectionTitle}>My Submissions ({submitted.length})</h3>

          {submitted.length === 0 ? (
            <p style={{ opacity: 0.6 }}>No submissions yet. Add a monument above!</p>
          ) : (
            <div style={gridStyle}>
              {submitted.map((m, index) => (
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
                  <p style={{ fontSize: "13px" }}>{m.description}</p>
                  
                  <div style={statusBadge(m.status)}>
                    {m.status}
                  </div>

                  {m.editedDate && (
                    <p style={{ fontSize: "11px", opacity: 0.6, marginTop: "5px" }}>
                      Edited: {m.editedDate}
                    </p>
                  )}
                  
                  <p style={{ fontSize: "11px", opacity: 0.6, marginTop: "10px" }}>
                    Submitted: {m.submittedDate}
                  </p>

                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={editBtn}
                      onClick={() => editMonument(index)}
                    >
                      Edit
                    </button>
                    <button
                      style={deleteBtn}
                      onClick={() => deleteMonument(index)}
                    >
                      Delete
                    </button>
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

// Status badge helper
const statusBadge = (status) => {
  if (status === "Approved") {
    return {
      display: "inline-block",
      marginTop: "10px",
      padding: "5px 12px",
      backgroundColor: "#2e8b57",
      borderRadius: "15px",
      fontSize: "12px",
      fontWeight: "bold"
    }
  } else if (status === "Rejected") {
    return {
      display: "inline-block",
      marginTop: "10px",
      padding: "5px 12px",
      backgroundColor: "#8b0000",
      borderRadius: "15px",
      fontSize: "12px",
      fontWeight: "bold"
    }
  }
  return {
    display: "inline-block",
    marginTop: "10px",
    padding: "5px 12px",
    backgroundColor: "#d4af37",
    color: "black",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "bold"
  }
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

const cancelBtn = {
  marginTop: "15px",
  padding: "12px 25px",
  backgroundColor: "#444",
  color: "white",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
}

const deleteBtn = {
  marginTop: "15px",
  marginLeft: "10px",
  padding: "8px 15px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
}

const editBtn = {
  marginTop: "15px",
  padding: "8px 15px",
  backgroundColor: "#4169e1",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
}

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
}

const statCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid",
  textAlign: "center",
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
