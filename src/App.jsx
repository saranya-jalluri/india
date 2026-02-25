import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import EnthusiastDashboard from "./pages/EnthusiastDashboard"
import CreatorDashboard from "./pages/CreatorDashboard"
import GuideDashboard from "./pages/GuideDashboard"
import Explore from "./pages/Explore"
import VirtualTour from "./pages/VirtualTour"
import Discussion from "./pages/Discussion"
import ContentApproval from "./pages/ContentApproval"
import ManageUsers from "./pages/ManageUsers"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/enthusiast" element={<EnthusiastDashboard />} />
        <Route path="/creator" element={<CreatorDashboard />} />
        <Route path="/guide" element={<GuideDashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/tour" element={<VirtualTour />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/approval" element={<ContentApproval />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App