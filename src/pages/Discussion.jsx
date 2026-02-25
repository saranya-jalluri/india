import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Discussion() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  // Load comments from localStorage on mount
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("heritageComments"))
    
    // Add demo discussions if none exist
    if (!stored || stored.length === 0) {
      const demoComments = [
        {
          name: "Rahul Sharma",
          comment: "The Taj Mahal is truly a masterpiece of Mughal architecture! The way light reflects off the white marble at different times of day is mesmerizing. Has anyone visited during the full moon night?",
          date: "24 Feb 2026",
          likes: 15
        },
        {
          name: "Priya Patel",
          comment: "I recently visited Hampi and the ruins are absolutely breathtaking. The Virupaksha temple and the stone chariot at Vittala temple are must-sees!",
          date: "23 Feb 2026",
          likes: 12
        },
        {
          name: "Amit Kumar",
          comment: "The Ajanta Caves paintings have survived for over 2000 years! It's amazing how ancient artists achieved such detail and vibrancy using natural pigments.",
          date: "22 Feb 2026",
          likes: 8
        },
        {
          name: "Sneha Reddy",
          comment: "Can someone recommend the best time to visit Konark Sun Temple? Is it better to go during sunrise or sunset?",
          date: "21 Feb 2026",
          likes: 5
        },
        {
          name: "Vikram Singh",
          comment: "The Golden Temple in Amritsar offers such a peaceful atmosphere. The community kitchen (langar) serving thousands daily is a beautiful example of selfless service.",
          date: "20 Feb 2026",
          likes: 20
        }
      ]
      
      localStorage.setItem("heritageComments", JSON.stringify(demoComments))
      setComments(demoComments)
    } else {
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
      date: new Date().toLocaleDateString(),
      likes: 0
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

  const likeComment = (index) => {
    const updated = comments.map((c, i) => 
      i === index ? { ...c, likes: c.likes + 1 } : c
    )
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
            style={{ ...inputStyle, minHeight: "100px" }}
            placeholder="Share your thoughts about Indian heritage..."
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
            Community Conversations ({comments.length})
          </h3>

          {comments.map((c, index) => (
            <div key={index} style={commentCard}>
              <div style={commentHeader}>
                <h4 style={{ color: "#d4af37", margin: 0 }}>{c.name}</h4>
                <span style={dateStyle}>{c.date}</span>
              </div>
              <p style={{ margin: "10px 0" }}>{c.comment}</p>
              
              <div style={actionRow}>
                <button style={likeBtn} onClick={() => likeComment(index)}>
                  👍 {c.likes || 0}
                </button>
                <button
                  style={deleteBtn}
                  onClick={() => deleteComment(index)}
                >
                  Delete
                </button>
              </div>
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

const commentHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const dateStyle = {
  fontSize: "12px",
  opacity: 0.6
}

const actionRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px"
}

const likeBtn = {
  padding: "6px 14px",
  backgroundColor: "#2e8b57",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
}

const deleteBtn = {
  padding: "6px 14px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
}

export default Discussion
