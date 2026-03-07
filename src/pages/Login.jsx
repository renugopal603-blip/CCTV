import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import './Login.css'

// Demo accounts for testing
const DEMO_USERS = [
    { email: 'admin@securevision.in', password: 'admin123', name: 'Admin User', role: 'admin' },
    { email: 'employee@securevision.in', password: 'emp123', name: 'Tech Employee', role: 'employee' },
    { email: 'demo@securevision.in', password: 'demo123', name: 'Demo Customer', role: 'customer' },
]

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await new Promise(r => setTimeout(r, 800))

        const users = JSON.parse(localStorage.getItem('sv_users') || '[]')
        const allUsers = [...DEMO_USERS, ...users]
        const found = allUsers.find(u => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password)

        if (found) {
            login({ ...found, password: undefined })
            toast.success(`Welcome back, ${found.name}!`)
            if (found.role === 'admin') navigate('/admin')
            else if (found.role === 'employee') navigate('/employee')
            else navigate('/dashboard')
        } else {
            toast.error('Invalid email or password')
        }
        setLoading(false)
    }

    return (
        <div className="auth-page">
            {/* Left side: branding/benefits */}
            <aside className="auth-aside">
                <div className="auth-aside__content">
                    <h1 className="auth-aside__title">Secure Your World With Vision.</h1>
                    <p className="auth-aside__desc">Access your dashboard to manage your security systems, view live feeds, and track your service requests.</p>
                    
                    <div className="auth-benefits">
                        {[
                            'Real-time Multi-camera Viewing',
                            'Automated AMC Status Alerts',
                            'Instant Technical Support Access',
                            'Simplified Installation Booking'
                        ].map(text => (
                            <div key={text} className="auth-benefit">
                                <div className="auth-benefit__icon">
                                    <FiCheck size={20} />
                                </div>
                                <span className="auth-benefit__text">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Right side: form */}
            <main className="auth-main">
                <div className="auth-form-wrap">
                    <div className="auth-header">
                        <Link to="/" className="auth-logo">
                            SECURE<span>VISION</span>
                        </Link>
                        <h2 className="auth-title">Welcome Back</h2>
                        <p className="auth-subtitle">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <label className="auth-input-label">Email Address</label>
                            <div className="auth-input-wrapper">
                                <input 
                                    className="auth-input" 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    value={form.email}
                                    onChange={e => setForm(f => ({...f, email: e.target.value}))}
                                    required
                                />
                                <FiMail className="auth-input-icon" />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-input-label">Password</label>
                            <div className="auth-input-wrapper">
                                <input 
                                    className="auth-input" 
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="••••••••" 
                                    value={form.password}
                                    onChange={e => setForm(f => ({...f, password: e.target.value}))}
                                    required
                                />
                                <FiLock className="auth-input-icon" />
                                <button 
                                    type="button" 
                                    className="auth-toggle-pass"
                                    onClick={() => setShowPass(!showPass)}
                                    aria-label={showPass ? 'Hide password' : 'Show password'}
                                >
                                    {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/signup" className="auth-link">Create an account</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
