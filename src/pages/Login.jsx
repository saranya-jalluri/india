import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const [role, setRole] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    setError("")

    const users = {
      admin: { user: "admin", pass: "1234" },
      enthusiast: { user: "user", pass: "1234" },
      creator: { user: "creator", pass: "1234" },
      guide: { user: "guide", pass: "1234" }
    }

    if (!role || !username || !password) {
      setError("All fields are required.")
      return
    }

    if (
      users[role] &&
      username === users[role].user &&
      password === users[role].pass
    ) {
      localStorage.setItem("role", role)
      navigate(`/${role}`)
    } else {
      setError("Invalid username or password.")
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        <h1 style={brandTitle}>Indian Heritage Explorer</h1>
        <p style={subtitle}>Secure Portal Login</p>

        {/* Role Select */}
        <div style={field}>
          <select
            style={inputStyle}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="admin">👑 Admin</option>
            <option value="enthusiast">🌏 Cultural Enthusiast</option>
            <option value="creator">🎨 Content Creator</option>
            <option value="guide">🧭 Tour Guide</option>
          </select>
        </div>

        {/* Username */}
        <div style={field}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div style={{ ...field, position: "relative" }}>
          <input
            style={inputStyle}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            style={toggleStyle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <button style={buttonStyle} onClick={handleLogin}>
          Access Dashboard
        </button>

      </div>
    </div>
  )
}

/* ===== PROFESSIONAL STYLES ===== */

const pageStyle = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #2a1f0f, #111)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Georgia, serif",
}

const cardStyle = {
  width: "420px",
  padding: "50px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(212,175,55,0.3)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  color: "white",
  animation: "fadeIn 0.8s ease-in-out"
}

const brandTitle = {
  textAlign: "center",
  fontSize: "28px",
  color: "#d4af37",
  marginBottom: "5px"
}

const subtitle = {
  textAlign: "center",
  fontSize: "14px",
  marginBottom: "35px",
  opacity: 0.8
}

const field = {
  marginBottom: "20px"
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid rgba(212,175,55,0.4)",
  background: "rgba(0,0,0,0.4)",
  color: "white",
  outline: "none",
  fontSize: "14px"
}

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "30px",
  border: "none",
  background: "linear-gradient(90deg, #d4af37, #f4d03f)",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
  marginTop: "15px",
  transition: "0.3s",
  boxShadow: "0 5px 20px rgba(212,175,55,0.4)"
}

const errorStyle = {
  color: "#ff4d4d",
  fontSize: "13px",
  marginBottom: "10px",
  textAlign: "center"
}

const toggleStyle = {
  position: "absolute",
  right: "15px",
  top: "16px",
  cursor: "pointer",
  fontSize: "12px",
  color: "#d4af37"
}

export default Login