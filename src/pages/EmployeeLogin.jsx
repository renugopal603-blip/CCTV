import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiBriefcase, FiTool, FiShield } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import './Login.css'

// Employees only
const EMPLOYEES = [
    { id: 'ADMIN01', email: 'admin@securevision.in', password: 'admin123', name: 'Admin User', role: 'admin' },
    { id: 'EMP101', email: 'employee@securevision.in', password: 'emp123', name: 'Tech Employee', role: 'employee' },
    { id: 'EMP102', email: 'renu@gmail.com', password: '123123', name: 'Renugopal', role: 'employee' },
]

export default function EmployeeLogin() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user, login } = useAuth()
    const navigate = useNavigate()

    // Redirect if already logged in as employee
    if (user && (user.role === 'employee' || user.role === 'admin')) {
        return <Navigate to="/employee-dashboard" />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await new Promise(r => setTimeout(r, 1000))

        const emailInput = form.email.trim().toLowerCase()
        const passInput = form.password.trim()

        const found = EMPLOYEES.find(u => u.email.toLowerCase() === emailInput && u.password === passInput)

        if (found) {
            login({ ...found, password: undefined })
            toast.success(`Access Granted. Welcome, ${found.name}.`)
            navigate('/employee-dashboard')
        } else {
            toast.error('Authentication Failed. Invalid credentials.')
        }
        setLoading(false)
    }

    return (
        <div className="auth-page">
            <aside className="auth-aside" style={{ backgroundColor: '#4682B4' }}>
                <div className="auth-aside__content">
                    <h1 className="auth-aside__title">Technician Service Portal</h1>
                    <p className="auth-aside__desc">SecureVision Employee Access Terminal. Log in to manage your service requests and daily operations.</p>
                    
                    <div className="auth-benefits">
                        {[
                            { icon: <FiBriefcase />, text: 'Job Management System' },
                            { icon: <FiTool />, text: 'Field Service Automation' },
                            { icon: <FiShield />, text: 'Secure Infrastructure' }
                        ].map((item, i) => (
                            <div key={i} className="auth-benefit">
                                <div className="auth-benefit__icon" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                                    {item.icon}
                                </div>
                                <span className="auth-benefit__text">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="auth-main">
                <div className="auth-form-wrap">
                    <div className="auth-header">
                        <div className="auth-logo" style={{ color: '#4682B4' }}>
                            SECURE<span>VISION</span>
                        </div>
                        <h2 className="auth-title">Employee Sign In</h2>
                        <p className="auth-subtitle">Authorized Personnel Only</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <label className="auth-input-label">Corporate Email</label>
                            <div className="auth-input-wrapper">
                                <input 
                                    className="auth-input" 
                                    type="email" 
                                    placeholder="name@securevision.in" 
                                    value={form.email}
                                    onChange={e => setForm(f => ({...f, email: e.target.value}))}
                                    required
                                />
                                <FiMail className="auth-input-icon" />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-input-label">Secure Password</label>
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
                                >
                                    {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="auth-submit-btn" 
                            style={{ backgroundColor: '#4682B4' }}
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Establish Connection'}
                        </button>
                    </form>

                    <p className="auth-footer" style={{ fontSize: '0.8rem' }}>
                        Locked Terminal • IP Logged • SecureVision Security Systems
                    </p>
                </div>
            </main>
        </div>
    )
}
