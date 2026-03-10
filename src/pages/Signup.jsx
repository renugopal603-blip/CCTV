import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone, FiCheck } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import './Signup.css'

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
        if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 800))

        const users = JSON.parse(localStorage.getItem('sv_users') || '[]')
        if (users.find(u => u.email.toLowerCase() === form.email.toLowerCase())) { 
            toast.error('Email already registered')
            setLoading(false)
            return 
        }

        const newUser = { 
            name: form.name, 
            email: form.email, 
            phone: form.phone, 
            password: form.password, 
            role: 'customer', 
            joinedAt: new Date().toISOString() 
        }
        users.push(newUser)
        localStorage.setItem('sv_users', JSON.stringify(users))
        // login({ ...newUser, password: undefined }) // Removed auto-login
        toast.success(`Account created successfully! Please sign in.`)
        navigate('/login')
        setLoading(false)
    }

    return (
        <div className="auth-page">
            <aside className="auth-aside">
                <div className="auth-aside__content animate-in">
                    <h1 className="auth-aside__title">Join SecureVision Today.</h1>
                    <p className="auth-aside__desc">Create an account to start your journey towards a safer, smarter property monitoring experience.</p>
                    
                    <div className="auth-benefits">
                        {[
                            'Free Property Security Audit',
                            'Exclusive Member Pricing',
                            'Direct Access to Tech Experts',
                            'Consolidated Billing Dashboard'
                        ].map((text, i) => (
                            <div key={text} className="auth-benefit" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                                <div className="auth-benefit__icon">
                                    <FiCheck size={18} />
                                </div>
                                <span className="auth-benefit__text">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="auth-main">
                <div className="auth-form-wrap animate-in">
                    <div className="auth-header">
                        <Link to="/" className="auth-logo">
                            SECURE<span>VISION</span>
                        </Link>
                        <h2 className="auth-title">Create Account</h2>
                        <p className="auth-subtitle">Fill in the details to get started</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="auth-grid">
                            <div className="auth-input-group">
                                <label className="auth-input-label">Full Name</label>
                                <div className="auth-input-wrapper">
                                    <input 
                                        className="auth-input" 
                                        type="text" 
                                        placeholder="John Doe" 
                                        value={form.name} 
                                        onChange={e => setForm(f => ({...f, name: e.target.value}))} 
                                        required 
                                    />
                                    <FiUser className="auth-input-icon" />
                                </div>
                            </div>
                            <div className="auth-input-group">
                                <label className="auth-input-label">Email Address</label>
                                <div className="auth-input-wrapper">
                                    <input 
                                        className="auth-input" 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        value={form.email} 
                                        onChange={e => setForm(f => ({...f, email: e.target.value}))} 
                                        required 
                                    />
                                    <FiMail className="auth-input-icon" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="auth-input-group">
                            <label className="auth-input-label">Phone Number</label>
                            <div className="auth-input-wrapper">
                                <input 
                                    className="auth-input" 
                                    type="tel" 
                                    placeholder="+91 XXXXXXXXXX" 
                                    value={form.phone} 
                                    onChange={e => setForm(f => ({...f, phone: e.target.value}))} 
                                    required 
                                />
                                <FiPhone className="auth-input-icon" />
                            </div>
                        </div>

                        <div className="auth-grid">
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
                            <div className="auth-input-group">
                                <label className="auth-input-label">Confirm Password</label>
                                <div className="auth-input-wrapper">
                                    <input 
                                        className="auth-input" 
                                        type={showPass ? 'text' : 'password'} 
                                        placeholder="••••••••" 
                                        value={form.confirm} 
                                        onChange={e => setForm(f => ({...f, confirm: e.target.value}))} 
                                        required 
                                    />
                                    <FiLock className="auth-input-icon" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'Establishing Account...' : 'Sign Up Now'}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
