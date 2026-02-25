import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ContentApproval() {
  const navigate = useNavigate()
  const [pending, setPending] = useState([])
  const [approved, setApproved] = useState([])

  /* ===== Load or Create Demo Pending Content ===== */
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("pendingMonuments"))

    if (!stored || stored.length === 0) {
      const demoPending = [
        {
          title: "Lotus Temple",
          location: "Delhi",
          description:
            "A Bahá'í House of Worship known for its flower-like architecture and peaceful atmosphere.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Lotus_Temple.jpg/1280px-Lotus_Temple.jpg",
          submittedBy: "creator01",
          submittedDate: "24 Feb 2026"
        },
        {
          title: "Mahabalipuram Shore Temple",
          location: "Tamil Nadu",
          description:
            "An ancient 8th-century structural temple overlooking the Bay of Bengal.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mahabalipuram_Shore_Temple.jpg/1280px-Mahabalipuram_Shore_Temple.jpg",
          submittedBy: "rahul123",
          submittedDate: "23 Feb 2026"
        },
        {
          title: "Jaisalmer Fort",
          location: "Rajasthan",
          description:
            "A massive sandstone fort known as the Golden Fort of India.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Jaisalmer_Fort.jpg/1280px-Jaisalmer_Fort.jpg",
          submittedBy: "creator01",
          submittedDate: "22 Feb 2026"
        }
      ]

      localStorage.setItem("pendingMonuments", JSON.stringify(demoPending))
      setPending(demoPending)
    } else {
      setPending(stored)
    }

    // Load approved count
    const approvedStored = JSON.parse(localStorage.getItem("publishedMonuments")) || []
    setApproved(approvedStored)
  }, [])

  /* ===== Approve Content ===== */
  const approve = (index) => {
    const itemToApprove = pending[index]
    
    // Create approved item with new ID
    const approvedItem = {
      id: Date.now(),
      name: itemToApprove.title,
      location: itemToApprove.location,
      description: itemToApprove.description,
      image: itemToApprove.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Gol_Gumbaz.jpg/1280px-Gol_Gumbaz.jpg",
      tourLink: itemToApprove.tourLink || "",
      approvedBy: localStorage.getItem("username") || "admin",
      approvedDate: new Date().toLocaleDateString()
    }

    // Save to published monuments
    const existingPublished = JSON.parse(localStorage.getItem("publishedMonuments")) || []
    const updatedPublished = [...existingPublished, approvedItem]
    localStorage.setItem("publishedMonuments", JSON.stringify(updatedPublished))
    setApproved(updatedPublished)

    // Remove from pending
    remove(index)

    alert(`"${itemToApprove.title}" has been approved and published to Explore page!`)
  }

  /* ===== Reject / Remove Content ===== */
  const remove = (index) => {
    const updated = pending.filter((_, i) => i !== index)
    setPending(updated)
    localStorage.setItem("pendingMonuments", JSON.stringify(updated))
  }

  return (
    <div style={containerStyle}>
      
      {/* Navbar */}
      <div style={navStyle}>
        <h2>✔ Content Approval Panel</h2>
        <button onClick={() => navigate("/admin")} style={backBtn}>
          ← Back to Admin
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        {/* Stats */}
        <div style={statsRow}>
          <div style={statCard}>
            <h3 style={{ color: "#d4af37", fontSize: "36px", margin: "0" }}>{pending.length}</h3>
            <p>Pending Reviews</p>
          </div>
          <div style={statCard}>
            <h3 style={{ color: "#2e8b57", fontSize: "36px", margin: "0" }}>{approved.length}</h3>
            <p>Published</p>
          </div>
        </div>

        <h2 style={titleStyle}>
          📋 Pending Submissions ({pending.length})
        </h2>

        {pending.length === 0 && (
          <div style={emptyState}>
            <p>No pending submissions.</p>
            <p style={{ fontSize: "13px", opacity: 0.7 }}>Content creators' submissions will appear here for review.</p>
          </div>
        )}

        {pending.map((item, index) => (
          <div key={index} style={cardStyle}>
            <div style={cardHeader}>
              <h3 style={{ color: "#d4af37", margin: 0 }}>
                {item.title}
              </h3>
              <span style={statusBadge("Pending")}>Pending</span>
            </div>

            <div style={cardBody}>
              <p><strong>📍 Location:</strong> {item.location}</p>
              <p><strong>📝 Description:</strong> {item.description}</p>
              
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={previewImage}
                />
              )}

              <div style={metaInfo}>
                <span>👤 Submitted by: <strong>{item.submittedBy || "Unknown"}</strong></span>
                <span>📅 Date: {item.submittedDate || "N/A"}</span>
              </div>
            </div>

            <div style={{ marginTop: "15px" }}>
              <button
                style={approveBtn}
                onClick={() => approve(index)}
              >
                ✅ Approve & Publish
              </button>

              <button
                style={rejectBtn}
                onClick={() => remove(index)}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

// Status badge
const statusBadge = (status) => {
  if (status === "Approved") {
    return {
      padding: "5px 12px",
      backgroundColor: "#2e8b57",
      borderRadius: "15px",
      fontSize: "12px",
      fontWeight: "bold"
    }
  } else if (status === "Rejected") {
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

const statsRow = {
  display: "flex",
  gap: "30px",
  marginBottom: "40px"
}

const statCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px 40px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  textAlign: "center"
}

const titleStyle = {
  color: "#d4af37",
  marginBottom: "40px",
}

const emptyState = {
  background: "rgba(255,255,255,0.05)",
  padding: "40px",
  borderRadius: "15px",
  textAlign: "center",
  border: "1px solid rgba(212,175,55,0.3)"
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
  lineHeight: "1.6"
}

const previewImage = {
  width: "100%",
  maxHeight: "200px",
  objectFit: "cover",
  borderRadius: "10px",
  marginTop: "15px"
}

const metaInfo = {
  display: "flex",
  gap: "20px",
  marginTop: "15px",
  fontSize: "13px",
  opacity: 0.8
}

const approveBtn = {
  padding: "10px 20px",
  backgroundColor: "#2e8b57",
  color: "white",
  border: "none",
  borderRadius: "20px",
  marginRight: "10px",
  cursor: "pointer",
  fontWeight: "bold"
}

const rejectBtn = {
  padding: "10px 20px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold"
}

export default ContentApproval
