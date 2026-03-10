import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
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
import EmployeeLogin from './pages/EmployeeLogin'
import OrderTracking from './pages/OrderTracking'
import CustomerDashboard from './pages/CustomerDashboard'

import AdminLogin from './pages/AdminLogin'

function AppContent() {
    const location = useLocation()
    const isDashboardPage = [
        '/login', '/signup', '/employee-dashboard', '/admin', '/employee-login',
        '/admin-login', '/admin-dashboard'
    ].some(path => location.pathname === path || location.pathname.startsWith(path))

    return (
        <div className="app">
            {!isDashboardPage && <Header />}
            <main className={isDashboardPage ? 'main--dashboard' : ''}>
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
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/cameras" element={<AdminDashboard />} />
                    <Route path="/admin/employees" element={<AdminDashboard />} />
                    <Route path="/admin/customers" element={<AdminDashboard />} />
                    <Route path="/admin/reports" element={<AdminDashboard />} />
                    <Route path="/admin/attendance" element={<AdminDashboard />} />
                    <Route path="/admin/settings" element={<AdminDashboard />} />

                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/employee-login" element={<EmployeeLogin />} />
                    <Route path="/tracking" element={<OrderTracking />} />
                    <Route path="/dashboard" element={<CustomerDashboard />} />
                </Routes>
            </main>
            {!isDashboardPage && <Footer />}
        </div>
    )
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <OrderProvider>
                        <AppContent />
                    </OrderProvider>
                </CartProvider>
            </AuthProvider>
        </Router>
    )
}

export default App
