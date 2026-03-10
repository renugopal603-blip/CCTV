import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock, FiShield, FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import './AdminLogin.css'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleDemoLogin = () => {
        setEmail('admin@securevision.in')
        setPassword('admin123')
        toast.info('Demo credentials filled. Click Access Dashboard.', {
            icon: <FiShield />,
            autoClose: 2000
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Demo Admin check
        const normalizedEmail = email.trim().toLowerCase()
        const normalizedPassword = password.trim()

        if (normalizedEmail === 'admin@securevision.in' && normalizedPassword === 'admin123') {
            await new Promise(r => setTimeout(r, 800))
            const adminUser = {
                id: 'ADMIN01',
                name: 'SecureVision Admin',
                email: 'admin@securevision.in',
                role: 'admin'
            }
            login(adminUser)
            toast.success('Access Granted. Welcome, Administrator.')
            navigate('/admin-dashboard')
        } else {
            toast.error('Invalid Credentials. Try using the Demo Login button below.')
        }
        setLoading(false)
    }

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-brand">
                        <FiShield className="shield-icon" />
                        <h2>SECURE<span>VISION</span></h2>
                    </div>
                    <h1>Admin Control Center</h1>
                    <p>Enter your credentials to access the management portal</p>
                </div>

                <form className="admin-login-form" onSubmit={handleLogin}>
                    <div className="admin-input-group">
                        <label>Administrative Email</label>
                        <div className="admin-input-wrapper">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                placeholder="admin@securevision.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-input-group">
                        <label>Security Password</label>
                        <div className="admin-input-wrapper">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Keep me authenticated</span>
                        </label>
                    </div>

                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? 'Verifying...' : 'Access Dashboard'}
                        <FiArrowRight />
                    </button>

                    <button
                        type="button"
                        className="admin-demo-btn"
                        onClick={handleDemoLogin}
                    >
                        <FiShield /> Use Demo Credentials
                    </button>
                </form>

                <div className="admin-login-footer">
                    <p>Authorized Personnel Only</p>
                    <Link to="/" className="back-link">Return to Main Website</Link>
                </div>
            </div>
        </div>
    )
}
