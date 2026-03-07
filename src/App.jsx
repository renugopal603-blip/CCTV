import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Booking from './pages/Booking'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import OrderTracking from './pages/OrderTracking'
import CustomerDashboard from './pages/CustomerDashboard'

function AppContent() {
    const location = useLocation()
    const isAuthPage = ['/login', '/signup'].includes(location.pathname)

    return (
        <div className="app">
            {!isAuthPage && <Header />}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/employee" element={<EmployeeDashboard />} />
                    <Route path="/tracking" element={<OrderTracking />} />
                    <Route path="/dashboard" element={<CustomerDashboard />} />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
        </div>
    )
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <AppContent />
                </CartProvider>
            </AuthProvider>
        </Router>
    )
}

export default App
