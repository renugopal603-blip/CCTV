import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { useCart } from '../context/CartContext'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import {
    FiBox, FiUser, FiCheckCircle, FiClock, FiBell, FiList,
    FiCheckSquare, FiBriefcase, FiCamera, FiCalendar, FiLogOut,
    FiFileText, FiActivity, FiDownload, FiPlus, FiSearch
} from 'react-icons/fi'
import './EmployeeDashboard.css'

export default function EmployeeDashboard() {
    const { user, logout, updateUser } = useAuth()
    const {
        orders, notifications, attendance, leaves, serviceRequests, salaryHistory,
        acceptOrder, updateOrderStatus, updateServiceStatus, addLeaveRequest, handleAttendance, clearNotification
    } = useOrders()

    const [activeTab, setActiveTab] = useState('dashboard')
    const [showNotifs, setShowNotifs] = useState(false)
    const [leaveForm, setLeaveForm] = useState({ type: 'Sick', startDate: '', endDate: '', reason: '' })
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({})
    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const handlePhotoClick = () => {
        fileInputRef.current.click()
    }

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                updateUser({ photo: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }



    const handleFileDownload = (doc) => {
        // Pointing to the actual placeholder PDF in the public folder
        const link = document.createElement("a");
        link.href = "/documents/placeholder.pdf";
        link.download = `${doc.title.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (!user || (user.role !== 'employee' && user.role !== 'admin')) return <Navigate to="/employee-login" />

    const profile = {
        name: user?.name || 'Employee',
        id: (user?.id || user?.email?.split('@')[0] || 'TEMP').toUpperCase(),
        phone: user?.phone || '+91 98765 43210',
        email: user?.email || 'portal@securevision.in',
        role: user?.role === 'employee' ? 'Senior CCTV Technician' : 'Administrator',
        joiningDate: user?.joiningDate || '2023-01-15',
        location: user?.location || 'Bangalore East Hub',
        address: user?.address || '123, 4th Cross, Indiranagar, Bangalore - 560038',
        photo: user?.photo || `https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=B0C4DE&color=fff&size=128`
    }

    const handleEditToggle = () => {
        setIsEditing(true)
        setEditData({
            name: profile.name,
            phone: profile.phone,
            email: profile.email,
            address: profile.address
        })
    }

    const handleSaveProfile = () => {
        updateUser(editData)
        setIsEditing(false)
    }

    const availableOrders = orders.filter(o => !o.assignedTo)
    const myTasks = orders.filter(o => o.assignedTo === user.id)
    const myInstallations = myTasks.filter(o => o.workType === 'Installation')

    const stats = [
        { label: 'Total Tasks', val: myTasks.length, icon: <FiList />, color: '#B0C4DE' },
        { label: 'Completed', val: myTasks.filter(o => o.status === 'Completed').length, icon: <FiCheckSquare />, color: '#10B981' },
        { label: 'Pending', val: myTasks.filter(o => o.status !== 'Completed').length, icon: <FiClock />, color: '#F59E0B' },
        { label: 'Today Installs', val: myInstallations.filter(i => i.installationDate === new Date().toISOString().split('T')[0]).length, icon: <FiCamera />, color: '#3B82F6' },
    ]

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <FiActivity /> },
        { id: 'tasks', label: 'My Tasks', icon: <FiList /> },
        { id: 'installations', label: 'Installations', icon: <FiCamera /> },
        { id: 'service', label: 'Service Requests', icon: <FiFileText /> },
        { id: 'attendance', label: 'Attendance', icon: <FiCalendar /> },
        { id: 'leaves', label: 'Leave Management', icon: <FiBriefcase /> },
        { id: 'documents', label: 'Documents', icon: <FiBox /> },
        { id: 'profile', label: 'Profile', icon: <FiUser /> },
    ]

    return (
        <div className="emp-dash">
            <div className="emp-dash__body">
                {/* Sidebar Navigation */}
                <aside className="emp-dash__sidebar">
                    <div className="emp-dash__sidebar-header">
                        <div className="emp-profile-mini">
                            <img src={profile.photo} alt="P" className="avatar-mini" />
                            <div className="info">
                                <p className="name">{profile.name}</p>
                                <p className="role">{profile.role}</p>
                            </div>
                        </div>
                    </div>

                    <nav className="emp-dash__nav">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={`emp-dash__nav-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                {item.icon} <span>{item.label}</span>
                            </button>
                        ))}
                        <button className="emp-dash__nav-item logout" onClick={logout}>
                            <FiLogOut /> <span>Logout</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="emp-dash__content">
                    <div className="dashboard-content-header">
                        <div className="header-title-area">
                            <h2>
                                {menuItems.find(i => i.id === activeTab)?.label}
                            </h2>
                        </div>

                        <div className="header-utils-area">
                            <div className="dash-search-bar">
                                <FiSearch />
                                <input type="text" placeholder="Search tasks, orders..." />
                            </div>

                            <div className="notif-bell-wrapper" style={{ position: 'relative' }}>
                                <button className="notif-bell-btn" onClick={() => setShowNotifs(!showNotifs)}>
                                    <FiBell />
                                    {notifications?.filter(n => !n.read).length > 0 && (
                                        <span className="notif-badge">{notifications.filter(n => !n.read).length}</span>
                                    )}
                                </button>

                                {showNotifs && (
                                    <div className="notif-dropdown">
                                        <div className="notif-dropdown-header">
                                            <h4>Notifications</h4>
                                            <span>{notifications?.filter(n => !n.read).length} New</span>
                                        </div>
                                        <div className="notif-dropdown-content">
                                            {notifications?.length > 0 ? (
                                                notifications.map(n => (
                                                    <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`} onClick={() => clearNotification(n.id)}>
                                                        <p>{n.message}</p>
                                                        <small>{n.time}</small>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-notif">No new notifications</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="content-scroll">
                        {activeTab === 'dashboard' && (
                            <>
                                <div className="emp-dash__stats">
                                    {stats.map(s => (
                                        <div key={s.label} className="stat-box">
                                            <div className="icon" style={{ backgroundColor: s.color + '20', color: s.color }}>{s.icon}</div>
                                            <div className="data">
                                                <span className="value">{s.val}</span>
                                                <span className="label">{s.label}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="dash-grid">
                                    <div className="dash-card">
                                        <h3 className="card-title">Pending Tasks Pool</h3>
                                        <div className="data-table-wrapper">
                                            <table className="data-table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Customer</th>
                                                        <th>Type</th>
                                                        <th>Location</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {availableOrders.slice(0, 5).map(o => (
                                                        <tr key={o.id}>
                                                            <td>{o.id}</td>
                                                            <td>{o.customerName}</td>
                                                            <td><span className={`badge ${o.workType.toLowerCase()}`}>{o.workType}</span></td>
                                                            <td>{o.address.split(',')[0]}</td>
                                                            <td><button className="btn-table" onClick={() => acceptOrder(o.id, user.id, user.name)}>Accept</button></td>
                                                        </tr>
                                                    ))}
                                                    {availableOrders.length === 0 && <tr><td colSpan="5" className="empty">No unassigned tasks</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="dash-card">
                                        <h3 className="card-title">Recent Activity</h3>
                                        <div className="activity-list">
                                            {[...attendance].reverse().slice(0, 4).map(a => (
                                                <div key={a.id} className="activity-item">
                                                    <div className="dot" style={{ backgroundColor: a.status === 'Present' ? '#10B981' : '#B0C4DE' }}></div>
                                                    <div className="info">
                                                        <p className="msg">Checked in on {a.date}</p>
                                                        <p className="time">{a.checkIn}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'tasks' && (
                            <div className="dash-card full">
                                <h3 className="card-title">Assigned Work Orders</h3>
                                <div className="data-table-wrapper">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Task ID</th>
                                                <th>Customer</th>
                                                <th>Location</th>
                                                <th>Work Type</th>
                                                <th>Assigned Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myTasks.map(o => (
                                                <tr key={o.id}>
                                                    <td>{o.id}</td>
                                                    <td>{o.customerName}</td>
                                                    <td>{o.address}</td>
                                                    <td><span className="badge">{o.workType}</span></td>
                                                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                                    <td><span className={`status-badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
                                                    <td>
                                                        <select
                                                            className="status-select"
                                                            value={o.status}
                                                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                                        >
                                                            <option value="Processing">Processing</option>
                                                            <option value="Installation">Installation</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                            {myTasks.length === 0 && <tr><td colSpan="7" className="empty">No tasks assigned</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'installations' && (
                            <div className="dash-card full">
                                <h3 className="card-title">CCTV Installation Assignments</h3>
                                <div className="data-table-wrapper">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Customer</th>
                                                <th>Address</th>
                                                <th>Cameras</th>
                                                <th>Installation Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myInstallations.map(inst => (
                                                <tr key={inst.id}>
                                                    <td>{inst.customerName}</td>
                                                    <td>{inst.address}</td>
                                                    <td>4 Cameras</td>
                                                    <td>{inst.installationDate}</td>
                                                    <td><span className={`status-badge ${inst.status.toLowerCase()}`}>{inst.status}</span></td>
                                                </tr>
                                            ))}
                                            {myInstallations.length === 0 && <tr><td colSpan="5" className="empty">No installations scheduled</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'service' && (
                            <div className="dash-card full">
                                <h3 className="card-title">Customer Service Requests</h3>
                                <div className="data-table-wrapper">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Complaint ID</th>
                                                <th>Customer</th>
                                                <th>Description</th>
                                                <th>Priority</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serviceRequests.map(sr => (
                                                <tr key={sr.id}>
                                                    <td>{sr.id}</td>
                                                    <td>{sr.customerName}</td>
                                                    <td>{sr.issue}</td>
                                                    <td><span className={`priority-badge ${sr.priority.toLowerCase()}`}>{sr.priority}</span></td>
                                                    <td>{sr.status}</td>
                                                    <td>
                                                        <button
                                                            className="btn-table"
                                                            onClick={() => updateServiceStatus(sr.id, 'Completed')}
                                                            disabled={sr.status === 'Completed'}
                                                        >
                                                            Solve
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'attendance' && (
                            <div className="dash-grid attendance-grid">
                                <div className="dash-card">
                                    <h3 className="card-title">Mark Attendance</h3>
                                    <div className="attendance-controls">
                                        <div className="timer">
                                            <p className="label">Today's Session</p>
                                            <p className="clock">08:30:15</p>
                                        </div>
                                        <div className="actions">
                                            <button className="btn-dash primary" onClick={() => handleAttendance('check-in')}>Check In</button>
                                            <button className="btn-dash" onClick={() => handleAttendance('check-out')}>Check Out</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="dash-card">
                                    <h3 className="card-title">Attendance History</h3>
                                    <div className="data-table-wrapper">
                                        <table className="data-table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Check In</th>
                                                    <th>Check Out</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attendance.map(a => (
                                                    <tr key={a.id}>
                                                        <td>{a.date}</td>
                                                        <td>{a.checkIn}</td>
                                                        <td>{a.checkOut}</td>
                                                        <td><span className="badge">{a.status}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'leaves' && (
                            <div className="dash-grid">
                                <div className="dash-card">
                                    <h3 className="card-title">Apply for Leave</h3>
                                    <form className="leave-form" onSubmit={(e) => { e.preventDefault(); addLeaveRequest(leaveForm); }}>
                                        <div className="form-group">
                                            <label>Leave Type</label>
                                            <select value={leaveForm.type} onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}>
                                                <option>Sick</option>
                                                <option>Casual</option>
                                            </select>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <input type="date" required onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <label>End Date</label>
                                                <input type="date" required onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Reason</label>
                                            <textarea rows="3" placeholder="Enter reason here..." required onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}></textarea>
                                        </div>
                                        <button type="submit" className="btn-dash primary full"><FiPlus /> Submit Request</button>
                                    </form>
                                </div>
                                <div className="dash-card">
                                    <h3 className="card-title">Leave History</h3>
                                    <div className="data-table-wrapper">
                                        <table className="data-table">
                                            <thead>
                                                <tr>
                                                    <th>Type</th>
                                                    <th>Dates</th>
                                                    <th>Reason</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leaves.map(l => (
                                                    <tr key={l.id}>
                                                        <td>{l.type}</td>
                                                        <td>{l.startDate} - {l.endDate}</td>
                                                        <td>{l.reason}</td>
                                                        <td><span className={`status-badge ${l.status.toLowerCase()}`}>{l.status}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}


                        {activeTab === 'documents' && (
                            <div className="dash-card full">
                                <h3 className="card-title">Company Documents</h3>
                                <div className="doc-grid">
                                    {[
                                        { title: 'Installation Guide', size: '2.4 MB', type: 'PDF' },
                                        { title: 'Training Manual', size: '4.1 MB', type: 'PDF' },
                                        { title: 'Company Policies', size: '1.2 MB', type: 'PDF' },
                                        { title: 'Safety Protocol', size: '890 KB', type: 'DOCX' },
                                    ].map(doc => (
                                        <div key={doc.title} className="doc-item">
                                            <div className="doc-icon"><FiFileText size={24} /></div>
                                            <div className="doc-info">
                                                <h4>{doc.title}</h4>
                                                <p>{doc.size} • {doc.type}</p>
                                            </div>
                                            <button className="doc-download" onClick={() => handleFileDownload(doc)}><FiDownload /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="dash-card full">
                                <div className="profile-hero">
                                    <div className="profile-main">
                                        <div className="profile-img-container">
                                            <img src={profile.photo} alt="P" className="profile-main-img" />
                                            <button className="edit-overlap" onClick={handlePhotoClick}><FiCamera /></button>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                onChange={handlePhotoUpload}
                                            />
                                        </div>
                                        <div className="profile-main-info">
                                            <h3>{profile.name}</h3>
                                            <p className="role">{profile.role}</p>
                                            <span className="id-badge">EMP ID: {profile.id}</span>
                                        </div>
                                    </div>
                                    {!isEditing ? (
                                        <button className="btn-dash primary" onClick={handleEditToggle}><FiCheckCircle /> Edit Profile</button>
                                    ) : (
                                        <div className="edit-actions">
                                            <button className="btn-dash" onClick={() => setIsEditing(false)}>Cancel</button>
                                            <button className="btn-dash primary" onClick={handleSaveProfile}>Save Changes</button>
                                        </div>
                                    )}
                                </div>

                                {!isEditing ? (
                                    <div className="profile-details-grid">
                                        <div className="detail-group">
                                            <label>Phone Number</label>
                                            <p>{profile.phone}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label>Email Address</label>
                                            <p>{profile.email}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label>Joining Date</label>
                                            <p>{profile.joiningDate}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label>Work Location</label>
                                            <p>{profile.location}</p>
                                        </div>
                                        <div className="detail-group full">
                                            <label>Permanent Address</label>
                                            <p>{profile.address}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="profile-edit-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    value={editData.name}
                                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    type="text"
                                                    value={editData.phone}
                                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                value={editData.email}
                                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Permanent Address</label>
                                            <textarea
                                                rows="3"
                                                value={editData.address}
                                                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
