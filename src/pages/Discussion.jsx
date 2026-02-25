import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Discussion() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  // Load comments from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("heritageComments"))
    if (stored && stored.length > 0) {
      setComments(stored)
    }
  }, [])

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("heritageComments", JSON.stringify(comments))
    }
  }, [comments])

  const addComment = () => {
    if (!name || !comment) return

    const newComment = {
      name,
      comment,
      date: new Date().toLocaleDateString()
    }

    const updatedComments = [...comments, newComment]
    setComments(updatedComments)
    localStorage.setItem("heritageComments", JSON.stringify(updatedComments))
    setName("")
    setComment("")
  }

  const deleteComment = (index) => {
    const updated = comments.filter((_, i) => i !== index)
    setComments(updated)
    localStorage.setItem("heritageComments", JSON.stringify(updated))
  }

  return (
    <div style={containerStyle}>
      
      {/* Navbar */}
      <div style={navStyle}>
        <h2>💬 Heritage Discussion Forum</h2>
        <button onClick={() => navigate(-1)} style={backBtn}>
          ← Back
        </button>
      </div>

      <div style={{ padding: "60px" }}>

        <h2 style={titleStyle}>💬 Heritage Discussion Forum</h2>

        {/* Guidelines */}
        <div style={guidelineCard}>
          <h3 style={{ color: "#d4af37" }}>Discussion Guidelines</h3>
          <ul>
            <li>✔ Respect cultural diversity</li>
            <li>✔ Share historical knowledge</li>
            <li>✔ Avoid inappropriate language</li>
            <li>✔ Encourage meaningful discussions</li>
          </ul>
        </div>

        {/* Comment Form */}
        <div style={formCard}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            style={inputStyle}
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button style={btnStyle} onClick={addComment}>
            Post Comment
          </button>
        </div>

        {/* Comments Section */}
        <div style={{ marginTop: "50px" }}>
          <h3 style={{ color: "#d4af37", marginBottom: "20px" }}>
            Community Conversations
          </h3>

          {comments.map((c, index) => (
            <div key={index} style={commentCard}>
              <h4 style={{ color: "#d4af37" }}>{c.name}</h4>
              <p>{c.comment}</p>

              <button
                style={deleteBtn}
                onClick={() => deleteComment(index)}
              >
                Delete
              </button>
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
  marginBottom: "40px",
  fontSize: "32px",
  color: "#d4af37",
}

const guidelineCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  marginBottom: "40px",
}

const formCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "30px",
  borderRadius: "15px",
  border: "1px solid rgba(212,175,55,0.3)",
  maxWidth: "600px",
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
  padding: "12px 25px",
  backgroundColor: "#d4af37",
  color: "black",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
}

const commentCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid rgba(212,175,55,0.3)",
  marginBottom: "20px",
}

const deleteBtn = {
  marginTop: "10px",
  padding: "6px 14px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
}

export default Discussion