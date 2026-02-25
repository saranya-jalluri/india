import { useEffect, useState } from "react"

function ContentApproval() {
  const [pending, setPending] = useState([])

  /* ===== Load or Create Demo Pending Content ===== */
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("pendingMonuments"))

    if (!stored || stored.length === 0) {
      const demoPending = [
        {
          title: "Lotus Temple",
          location: "Delhi",
          description:
            "A Bahá'í House of Worship known for its flower-like architecture and peaceful atmosphere."
        },
        {
          title: "Mahabalipuram Shore Temple",
          location: "Tamil Nadu",
          description:
            "An ancient 8th-century structural temple overlooking the Bay of Bengal."
        },
        {
          title: "Jaisalmer Fort",
          location: "Rajasthan",
          description:
            "A massive sandstone fort known as the Golden Fort of India."
        }
      ]

      localStorage.setItem(
        "pendingMonuments",
        JSON.stringify(demoPending)
      )

      setPending(demoPending)
    } else {
      setPending(stored)
    }
  }, [])

  /* ===== Approve Content ===== */
  const approve = (index) => {
    const approved =
      JSON.parse(localStorage.getItem("monuments")) || []

    const updatedApproved = [...approved, pending[index]]

    localStorage.setItem("monuments", JSON.stringify(updatedApproved))

    remove(index)
  }

  /* ===== Reject / Remove Content ===== */
  const remove = (index) => {
    const updated = pending.filter((_, i) => i !== index)
    setPending(updated)
    localStorage.setItem("pendingMonuments", JSON.stringify(updated))
  }

  return (
    <div style={containerStyle}>
      <div style={{ padding: "60px" }}>

        <h2 style={titleStyle}>
          ✔ Content Approval Panel ({pending.length})
        </h2>

        {pending.length === 0 && (
          <p>No pending submissions.</p>
        )}

        {pending.map((item, index) => (
          <div key={index} style={cardStyle}>
            <h3 style={{ color: "#d4af37" }}>
              {item.title}
            </h3>

            <p><strong>Location:</strong> {item.location}</p>
            <p>{item.description}</p>

            <div style={{ marginTop: "15px" }}>
              <button
                style={approveBtn}
                onClick={() => approve(index)}
              >
                Approve
              </button>

              <button
                style={rejectBtn}
                onClick={() => remove(index)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}

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
  color: "#d4af37",
  marginBottom: "40px",
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

const approveBtn = {
  padding: "8px 18px",
  backgroundColor: "#d4af37",
  border: "none",
  borderRadius: "20px",
  marginRight: "10px",
  cursor: "pointer",
  fontWeight: "bold"
}

const rejectBtn = {
  padding: "8px 18px",
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold"
}

export default ContentApproval