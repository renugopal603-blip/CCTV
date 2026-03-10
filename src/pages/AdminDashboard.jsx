import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { Navigate, Link, useLocation } from 'react-router-dom'
import {
    FiGrid, FiVideo, FiUsers, FiUserCheck,
    FiBarChart2, FiSettings, FiLogOut, FiBell,
    FiSearch, FiMenu, FiChevronRight, FiShield, FiCalendar
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import './AdminDashboard.css'

// Modular Components (Internal for now, can be extracted)
import Overview from './admin/Overview'
import Cameras from './admin/Cameras'
import Employees from './admin/Employees'
import Customers from './admin/Customers'
import Settings from './admin/Settings'
import Attendance from './admin/Attendance'

export default function AdminDashboard() {
    const { user, logout } = useAuth()
    const { notifications, markNotificationsAsRead } = useOrders()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [showNotifs, setShowNotifs] = useState(false)

    const unreadCount = notifications.filter(n => !n.read).length

    // Check if user is admin
    if (!user || user.role !== 'admin') return <Navigate to="/admin-login" />

    const NAV_ITEMS = [
        { id: 'dashboard', label: 'Dashboard', icon: <FiGrid />, path: '/admin-dashboard' },
        { id: 'cameras', label: 'CCTV Cameras', icon: <FiVideo />, path: '/admin/cameras' },
        { id: 'employees', label: 'Employees', icon: <FiUserCheck />, path: '/admin/employees' },
        { id: 'customers', label: 'Customers', icon: <FiUsers />, path: '/admin/customers' },
        { id: 'attendance', label: 'Attendance', icon: <FiCalendar />, path: '/admin/attendance' },
        { id: 'reports', label: 'Reports', icon: <FiBarChart2 />, path: '/admin/reports' },
        { id: 'settings', label: 'Settings', icon: <FiSettings />, path: '/admin/settings' },
    ]

    const handleLogout = () => {
        logout()
        toast.info('Logged out from Admin Panel')
    }

    // Determine which sub-page to show based on path
    const renderContent = () => {
        const path = location.pathname
        if (path === '/admin-dashboard') return <Overview />
        if (path === '/admin/cameras') return <Cameras />
        if (path === '/admin/employees') return <Employees />
        if (path === '/admin/customers') return <Customers />
        if (path === '/admin/attendance') return <Attendance />
        if (path === '/admin/settings') return <Settings />
        return <div className="admin-card-large"><h3>Module Under Development</h3><p>Route: {path}</p></div>
    }

    return (
        <div className="admin-dash">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
                <div className="admin-sidebar-header">
                    <div className="admin-logo">
                        <FiShield className="shield-icon" />
                        <span>SECURE<span>VISION</span></span>
                    </div>
                </div>

                <nav className="admin-nav">
                    {NAV_ITEMS.map(item => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="icon">{item.icon}</span>
                            <span className="label">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="admin-logout">
                    <button onClick={handleLogout} className="admin-nav-item" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <span className="icon"><FiLogOut /></span>
                        <span className="label">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="admin-main">
                <header className="admin-navbar">
                    <div className="navbar-left">
                        <h2>{NAV_ITEMS.find(i => i.path === location.pathname)?.label || 'Admin Panel'}</h2>
                    </div>

                    <div className="navbar-right">
                        <div className="admin-search">
                            <FiSearch />
                            <input type="text" placeholder="Search system..." />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <button className="nav-icon-btn" onClick={() => {
                                setShowNotifs(!showNotifs)
                                if (!showNotifs) markNotificationsAsRead()
                            }}>
                                <FiBell />
                                {unreadCount > 0 && <span className="dot"></span>}
                            </button>

                            {showNotifs && (
                                <div className="notif-dropdown">
                                    <div className="notif-header">
                                        <h4>Notifications</h4>
                                        <span className="notif-count">{notifications.length} Total</span>
                                    </div>
                                    <div className="notif-list">
                                        {notifications.map(n => (
                                            <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                                                <p>{n.message}</p>
                                                <small>{new Date(n.createdAt).toLocaleTimeString()}</small>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && <p className="notif-empty">No new notifications</p>}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="admin-profile-pill">
                            <span className="admin-name">{user.name}</span>
                            <div className="admin-avatar">{user.name[0]}</div>
                        </div>
                    </div>
                </header>

                <div className="admin-content">
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}
