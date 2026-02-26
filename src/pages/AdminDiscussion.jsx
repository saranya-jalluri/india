import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AdminDiscussion() {
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Load comments from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("heritageComments")) || []
    setComments(stored)
  }, [])

  const deleteComment = (index) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return
    
    const updated = comments.filter((_, i) => i !== index)
    setComments(updated)
    localStorage.setItem("heritageComments", JSON.stringify(updated))
  }

  const filteredComments = comments.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.comment.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={containerStyle}>
      
      {/* Navbar */}
      <div style={navStyle}>
        <div>
          <h2>💬 Admin Discussion Monitor</h2>
          <p style={{ fontSize: "12px", opacity: 0.7, margin: 0 }}>
            Viewing all community discussions
          </p>
        </div>
        <button onClick={() => navigate("/admin")} style={backBtn}>
          ← Back to Admin
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        <h2 style={titleStyle}>💬 Discussion Monitor</h2>

        {/* Admin Info Card */}
        <div style={infoCard}>
          <h3 style={{ color: "#d4af37", margin: "0 0 10px 0" }}>👑 Admin View</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            You are in <strong>read-only mode</strong>. You can monitor discussions and delete inappropriate comments, but cannot post new comments.
          </p>
        </div>

        {/* Search Bar */}
        <div style={searchContainer}>
          <input
            style={searchInput}
            type="text"
            placeholder="Search discussions by name or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div style={statsRow}>
          <div style={statBox}>
            <span style={statNumber}>{comments.length}</span>
            <span style={statLabel}>Total Comments</span>
          </div>
          <div style={statBox}>
            <span style={statNumber}>{filteredComments.length}</span>
            <span style={statLabel}>Showing</span>
          </div>
        </div>

        {/* Comments Section - Read Only for Admin */}
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ color: "#d4af37", marginBottom: "20px" }}>
            Community Conversations ({filteredComments.length})
          </h3>

          {filteredComments.length === 0 ? (
            <div style={emptyState}>
              <p>No discussions found.</p>
            </div>
          ) : (
            filteredComments.map((c, index) => (
              <div key={index} style={commentCard}>
                <div style={commentHeader}>
                  <div>
                    <h4 style={{ color: "#d4af37", margin: 0 }}>{c.name}</h4>
                    <span style={dateStyle}>{c.date}</span>
                  </div>
                  <div style={actionButtons}>
                    <button
                      style={deleteBtn}
                      onClick={() => deleteComment(index)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
                <p style={{ margin: "15px 0", lineHeight: "1.6" }}>{c.comment}</p>
                
                <div style={metaRow}>
                  <span style={metaItem}>👍 {c.likes || 0} likes</span>
                  <span style={metaItem}>💬 {c.comment.length} characters</span>
                </div>
              </div>
            ))
          )}
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

const backBtn = {
  padding: "8px 18px",
  backgroundColor: "transparent",
  color: "#d4af37",
  border: "1px solid #d4af37",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
}

const titleStyle = {
  textAlign: "center",
  marginBottom: "40px",
  fontSize: "32px",
  color: "#d4af37",
}

const infoCard = {
  background: "rgba(212,175,55,0.1)",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  marginBottom: "30px",
}

const searchContainer = {
  marginBottom: "30px"
}

const searchInput = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid rgba(212,175,55,0.4)",
  backgroundColor: "rgba(0,0,0,0.3)",
  color: "white",
  fontSize: "14px"
}

const statsRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px"
}

const statBox = {
  background: "rgba(255,255,255,0.05)",
  padding: "15px 25px",
  borderRadius: "10px",
  border: "1px solid rgba(212,175,55,0.3)",
  display: "flex",
  alignItems: "center",
  gap: "10px"
}

const statNumber = {
  fontSize: "24px",
  color: "#d4af37",
  fontWeight: "bold"
}

const statLabel = {
  fontSize: "14px",
  opacity: 0.8
}

const commentCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid rgba(212,175,55,0.3)",
  marginBottom: "20px",
}

const commentHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}

const dateStyle = {
  fontSize: "12px",
  opacity: 0.6
}

const actionButtons = {
  display: "flex",
  gap: "10px"
}

const deleteBtn = {
  padding: "6px 14px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
}

const metaRow = {
  display: "flex",
  gap: "20px",
  marginTop: "10px"
}

const metaItem = {
  fontSize: "12px",
  opacity: 0.6
}

const emptyState = {
  textAlign: "center",
  padding: "40px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)"
}

export default AdminDiscussion
