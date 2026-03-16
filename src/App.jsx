import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer" // ⬅️ Footer'ı import ettik
import HomePage from "./pages/HomePage"
import PetProfilePage from "./pages/PetProfilePage"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import ActivatePage from "./pages/ActivatePage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pet/:id" element={<PetProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/activate/:id" element={<ActivatePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer /> 
    </div>
  )
}

export default App