import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { monuments as staticMonuments } from "../data/monuments"

function Explore() {
  const navigate = useNavigate()
  const [allMonuments, setAllMonuments] = useState([])
  const [filter, setFilter] = useState("All")
  const [selectedMonument, setSelectedMonument] = useState(null)
  const [bookingData, setBookingData] = useState({ date: "", time: "", name: "", phone: "" })
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    const published = JSON.parse(localStorage.getItem("publishedMonuments")) || []
    const combined = [...staticMonuments, ...published]
    setAllMonuments(combined)
  }, [])

  const locations = ["All", ...new Set(allMonuments.map(m => m.location.split(",")[0].trim()))]

  const filteredMonuments = filter === "All" 
    ? allMonuments 
    : allMonuments.filter(m => m.location.includes(filter))

  const handleBookGuide = () => {
    if (bookingData.name && bookingData.phone && bookingData.date && bookingData.time) {
      const existingBookings = JSON.parse(localStorage.getItem("userBookings")) || []
      const newBooking = { 
        userName: bookingData.name, 
        phone: bookingData.phone, 
        monument: selectedMonument?.name, 
        location: selectedMonument?.location, 
        date: bookingData.date, 
        time: bookingData.time, 
        status: "Pending", 
        bookedAt: new Date().toISOString() 
      }
      localStorage.setItem("userBookings", JSON.stringify([...existingBookings, newBooking]))
      
      const guideBookings = JSON.parse(localStorage.getItem("guideBookings")) || []
      const guideBooking = { 
        name: bookingData.name, 
        phone: bookingData.phone, 
        monument: selectedMonument?.name, 
        location: selectedMonument?.location, 
        date: bookingData.date, 
        time: bookingData.time, 
        status: "Pending" 
      }
      localStorage.setItem("guideBookings", JSON.stringify([...guideBookings, guideBooking]))
      setBookingSuccess(true)
    } else {
      alert("Please fill in all fields!")
    }
  }

  return (
    <div style={containerStyle}>
      <div style={navStyle}>
        <h2>🏛 Explore Indian Heritage</h2>
        <button onClick={() => navigate(-1)} style={backBtn}>← Back</button>
      </div>

      <div style={{ padding: "60px" }}>
        <div style={headerSection}>
          <h2 style={titleStyle}>🏛 Discover India's Heritage</h2>
          <div style={filterSection}>
            <label style={{ marginRight: "15px", color: "#d4af37" }}>Filter by Region:</label>
            <select style={filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
              {locations.map(loc => (<option key={loc} value={loc}>{loc}</option>))}
            </select>
            <span style={countBadge}>Showing {filteredMonuments.length} monuments</span>
          </div>
        </div>

        <div style={gridStyle}>
          {filteredMonuments.map((monument, index) => (
            <div key={monument.id || index} style={cardStyle}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 15px 40px rgba(212,175,55,0.3)" }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)" }}
            >
              <div style={imageContainer}>
                <img src={monument.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Gol_Gumbaz.jpg/1280px-Gol_Gumbaz.jpg"} alt={monument.name} style={imageStyle} onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/6/6/commons/thumbe/Gol_Gumbaz.jpg/1280px-Gol_Gumbaz.jpg" }} />
                <div style={imageOverlay}><span style={viewCount}>👁 Explore</span></div>
              </div>
              <div style={cardContent}>
                <h3 style={cardTitle}>{monument.name}</h3>
                <p style={locationStyle}>📍 {monument.location}</p>
                <p style={descStyle}>{monument.description}</p>
                <div style={cardFooter}>
                  <button style={btnStyle} onClick={() => navigate("/tour")}>🎥 Virtual Tour</button>
                  <button style={bookBtnStyle} onClick={() => { setSelectedMonument(monument); setShowBookingModal(true); setBookingSuccess(false); setBookingData({ date: "", time: "", name: "", phone: "" }) }}>📅 Book Guide</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMonuments.length === 0 && (<div style={emptyState}><p>No monuments found for this filter.</p></div>)}
      </div>

      {showBookingModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            {bookingSuccess ? (
              <div style={successContainer}>
                <h2 style={successTitle}>✅ Booking Confirmed!</h2>
                <p style={successText}>Your guide booking for <strong>{selectedMonument?.name}</strong> has been submitted.</p>
                <p style={successText}>Date: {bookingData.date} at {bookingData.time}</p>
                <button style={modalCloseBtn} onClick={() => { setShowBookingModal(false); setBookingSuccess(false) }}>Close</button>
              </div>
            ) : (
              <>
                <h2 style={modalTitle}>📅 Book a Tour Guide</h2>
                <p style={modalSubtitle}>Monument: {selectedMonument?.name}</p>
                <p style={modalLocation}>📍 {selectedMonument?.location}</p>
                <div style={formGroup}><label style={formLabel}>Your Name:</label><input type="text" style={formInput} placeholder="Enter your name" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})} /></div>
                <div style={formGroup}><label style={formLabel}>Phone Number:</label><input type="tel" style={formInput} placeholder="Enter your phone" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} /></div>
                <div style={formGroup}><label style={formLabel}>Select Date:</label><input type="date" style={formInput} value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} /></div>
                <div style={formGroup}><label style={formLabel}>Select Time:</label>
                  <select style={formInput} value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})}>
                    <option value="">Select time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
                <div style={modalButtons}>
                  <button style={cancelBtn} onClick={() => setShowBookingModal(false)}>Cancel</button>
                  <button style={submitBtn} onClick={handleBookGuide}>Submit Booking</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const containerStyle = { minHeight: "100vh", background: "linear-gradient(to bottom, #1a1a1a, #2c2c2c)", color: "white", fontFamily: "Georgia, serif" }
const navStyle = { backgroundColor: "#111", padding: "20px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #d4af37" }
const backBtn = { padding: "8px 18px", backgroundColor: "transparent", color: "#d4af37", border: "1px solid #d4af37", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }
const headerSection = { marginBottom: "40px" }
const titleStyle = { textAlign: "center", marginBottom: "30px", fontSize: "36px", color: "#d4af37" }
const filterSection = { display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", flexWrap: "wrap" }
const filterSelect = { padding: "10px 20px", borderRadius: "25px", border: "1px solid rgba(212,175,55,0.4)", backgroundColor: "rgba(0,0,0,0.4)", color: "white", fontSize: "14px", cursor: "pointer" }
const countBadge = { padding: "8px 15px", backgroundColor: "rgba(212,175,55,0.2)", borderRadius: "20px", fontSize: "13px", color: "#d4af37" }
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "35px" }
const cardStyle = { background: "rgba(255,255,255,0.05)", borderRadius: "20px", border: "1px solid rgba(212,175,55,0.3)", backdropFilter: "blur(8px)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", transition: "all 0.3s ease", overflow: "hidden" }
const imageContainer = { position: "relative", overflow: "hidden" }
const imageStyle = { width: "100%", height: "200px", objectFit: "cover", borderRadius: "20px 20px 0 0" }
const imageOverlay = { position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "20px", opacity: 0, transition: "opacity 0.3s ease" }
const viewCount = { color: "#d4af37", fontWeight: "bold" }
const cardContent = { padding: "20px" }
const cardTitle = { color: "#d4af37", marginBottom: "8px", fontSize: "20px" }
const locationStyle = { fontSize: "13px", opacity: 0.7, marginBottom: "10px" }
const descStyle = { fontSize: "14px", lineHeight: "1.5", marginBottom: "15px" }
const cardFooter = { display: "flex", justifyContent: "space-between", alignItems: "center" }
const btnStyle = { padding: "10px 20px", background: "linear-gradient(90deg, #d4af37, #f4d03f)", color: "#000", border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", transition: "transform 0.2s ease" }
const bookBtnStyle = { padding: "10px 20px", backgroundColor: "#2e8b57", color: "white", border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }
const emptyState = { textAlign: "center", padding: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "15px", border: "1px solid rgba(212,175,55,0.3)" }
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }
const modalContent = { background: "linear-gradient(to bottom, #2c2c2c, #1a1a1a)", padding: "40px", borderRadius: "20px", border: "1px solid #d4af37", maxWidth: "500px", width: "90%", maxHeight: "90vh", overflowY: "auto" }
const modalTitle = { color: "#d4af37", fontSize: "24px", marginBottom: "10px", textAlign: "center" }
const modalSubtitle = { color: "#fff", fontSize: "16px", marginBottom: "5px" }
const modalLocation = { color: "#aaa", fontSize: "14px", marginBottom: "20px" }
const formGroup = { marginBottom: "15px" }
const formLabel = { display: "block", color: "#d4af37", marginBottom: "8px", fontSize: "14px" }
const formInput = { width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid rgba(212,175,55,0.4)", backgroundColor: "rgba(0,0,0,0.4)", color: "white", fontSize: "14px", boxSizing: "border-box" }
const modalButtons = { display: "flex", justifyContent: "space-between", marginTop: "25px" }
const cancelBtn = { padding: "10px 25px", backgroundColor: "transparent", color: "#fff", border: "1px solid #fff", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }
const submitBtn = { padding: "10px 25px", backgroundColor: "#d4af37", color: "black", border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }
const successContainer = { textAlign: "center" }
const successTitle = { color: "#2e8b57", fontSize: "28px", marginBottom: "15px" }
const successText = { color: "#fff", fontSize: "16px", marginBottom: "10px" }
const modalCloseBtn = { marginTop: "20px", padding: "10px 30px", backgroundColor: "#d4af37", color: "black", border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }

export default Explore
