import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiSettings, FiPackage } from 'react-icons/fi'
import './Header.css'

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Contact Us', path: '/contact' },
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const { user, logout } = useAuth()
    const { cartCount } = useCart()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        setUserMenuOpen(false)
        navigate('/')
    }

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__inner container">
                {/* Logo */}
                <Link to="/" className="header__logo">
                    <div className="logo-text">
                        <span className="logo-main">Secure</span>
                        <span className="logo-accent">Vision</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="header__nav">
                    {navLinks.map(l => (
                        <NavLink
                            key={l.path}
                            to={l.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                            end={l.path === '/'}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Actions */}
                <div className="header__actions">
                    {/* Cart */}
                    <Link to="/cart" className="header__icon-btn" aria-label="Cart">
                        <FiShoppingCart size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    {/* User */}
                    {user ? (
                        <div className="user-menu-wrapper">
                            <button
                                className="header__user-btn"
                                onClick={() => setUserMenuOpen(v => !v)}
                            >
                                <div className="avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</div>
                                <span className="user-name">{user.name?.split(' ')[0]}</span>
                            </button>
                            {userMenuOpen && (
                                <div className="user-dropdown">
                                    <div className="user-dropdown__header">
                                        <div className="avatar avatar--lg">{user.name?.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <p className="user-dropdown__name">{user.name}</p>
                                            <p className="user-dropdown__email">{user.email}</p>
                                        </div>
                                    </div>
                                    <hr className="divider" />
                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="user-dropdown__item" onClick={() => setUserMenuOpen(false)}>
                                            <FiSettings size={15} /> Admin Dashboard
                                        </Link>
                                    )}
                                    {user.role === 'customer' && (
                                        <Link to="/dashboard" className="user-dropdown__item" onClick={() => setUserMenuOpen(false)}>
                                            <FiUser size={15} /> My Dashboard
                                        </Link>
                                    )}
                                    <Link to="/tracking" className="user-dropdown__item" onClick={() => setUserMenuOpen(false)}>
                                        <FiPackage size={15} /> Order Tracking
                                    </Link>
                                    <button className="user-dropdown__item user-dropdown__item--danger" onClick={handleLogout}>
                                        <FiLogOut size={15} /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-btns">
                            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                            <Link to="/signup" className="btn btn-ghost btn-sm">Sign Up</Link>
                        </div>
                    )}

                    {/* Book CTA */}
                    <Link to="/booking" className="btn btn-accent btn-sm header__book-btn">
                        Book Installation
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        className="header__hamburger"
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    {navLinks.map(l => (
                        <NavLink
                            key={l.path}
                            to={l.path}
                            className="mobile-menu__link"
                            onClick={() => setMenuOpen(false)}
                            end={l.path === '/'}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <hr className="divider" />
                    {!user ? (
                        <div className="mobile-menu__auth">
                            <Link to="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/signup" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                            <Link to="/booking" className="btn btn-accent btn-sm" onClick={() => setMenuOpen(false)}>Book Installation</Link>
                        </div>
                    ) : (
                        <div className="mobile-menu__auth">
                            <Link to="/booking" className="btn btn-accent btn-sm" onClick={() => setMenuOpen(false)}>Book Installation</Link>
                            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Sign Out</button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
