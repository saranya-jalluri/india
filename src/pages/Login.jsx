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

    // Valid users configuration
    const adminUsers = [
      { user: "admin", pass: "1234" },
      { user: "gudia", pass: "gudia123" }
    ]

    const users = {
      admin: adminUsers,
      enthusiast: { user: "user", pass: "1234" },
      creator: { user: "creator", pass: "1234" },
      guide: { user: "guide", pass: "1234" }
    }

    if (!role || !username || !password) {
      setError("All fields are required.")
      return
    }

    // Check for admin users (array)
    if (role === "admin" && Array.isArray(users[role])) {
      const validAdmin = users[role].find(u => u.user === username && u.pass === password)
      if (validAdmin) {
        localStorage.setItem("role", role)
        localStorage.setItem("username", username)
        navigate(`/${role}`)
        return
      }
    } else if (users[role]) {
      // Check for regular users (object)
      if (username === users[role].user && password === users[role].pass) {
        localStorage.setItem("role", role)
        localStorage.setItem("username", username)
        navigate(`/${role}`)
        return
      }
    }

    setError("Invalid username or password.")
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

        {/* Admin Credentials Info */}
        {role === "admin" && (
          <div style={infoBox}>
            <p style={{ margin: "5px 0", fontSize: "12px" }}>Admin Options:</p>
            <p style={{ margin: "2px 0", fontSize: "11px", opacity: 0.8 }}>• admin / 1234</p>
            <p style={{ margin: "2px 0", fontSize: "11px", opacity: 0.8 }}>• gudia / gudia123</p>
          </div>
        )}

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

const infoBox = {
  marginTop: "20px",
  padding: "12px",
  background: "rgba(212,175,55,0.1)",
  borderRadius: "8px",
  border: "1px solid rgba(212,175,55,0.3)",
  textAlign: "center"
}

export default Login
