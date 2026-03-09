import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import DogProfilePage from "./pages/DogProfilePage"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import ActivatePage from "./pages/ActivatePage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"


function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dog/:id" element={<DogProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/activate/:id" element={<ActivatePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

      </Routes>
    </div>
  )
}

export default App