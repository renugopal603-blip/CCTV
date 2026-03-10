import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiUser, FiBriefcase, FiBell, FiShield,
    FiUsers, FiDatabase, FiLayout, FiSave,
    FiCamera, FiUpload, FiLock, FiLogOut,
    FiDownload, FiRefreshCw, FiMoon, FiSun
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import './Settings.css'

export default function Settings() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState('profile')

    const TABS = [
        { id: 'profile', label: 'Profile Settings', icon: <FiUser /> },
        { id: 'company', label: 'Company Settings', icon: <FiBriefcase /> },
        { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
        { id: 'security', label: 'Security', icon: <FiShield /> },
        { id: 'permissions', label: 'Permissions', icon: <FiUsers /> },
        { id: 'backup', label: 'Backup & Data', icon: <FiDatabase /> },
        { id: 'appearance', label: 'Appearance', icon: <FiLayout /> },
    ]

    const handleDownload = (fileName, fileType = 'pdf') => {
        const link = document.createElement("a");
        link.href = "/documents/placeholder.pdf";
        link.download = `${fileName.replace(/\s+/g, '_')}.${fileType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="settings-card"
                    >
                        <h3 className="card-title"><FiUser /> Profile Settings</h3>
                        <div className="photo-upload-container">
                            <div className="avatar-preview">
                                <FiCamera />
                            </div>
                            <div className="upload-actions">
                                <button className="btn-primary"><FiUpload /> Upload New Photo</button>
                                <span className="upload-hint">JPG, PNG or GIF. Max 800K</span>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Admin Name</label>
                                <input type="text" placeholder="John Doe" defaultValue={user?.name || "SecureVision Admin"} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="admin@securevision.com" defaultValue="admin@securevision.com" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="+1 234 567 890" defaultValue="+91 98765 43210" />
                            </div>
                            <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                                <button className="btn-outline"><FiLock /> Change Password</button>
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-primary"><FiSave /> Save Profile Changes</button>
                        </div>
                    </motion.div>
                )
            case 'company':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="settings-card"
                    >
                        <h3 className="card-title"><FiBriefcase /> Company / System Settings</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Company Name</label>
                                <input type="text" defaultValue="SecureVision CCTV" />
                            </div>
                            <div className="form-group">
                                <label>Support Email</label>
                                <input type="email" defaultValue="support@securevision.com" />
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input type="tel" defaultValue="+91 80 1234 5678" />
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 1' }}>
                                <label>Company Address</label>
                                <input type="text" defaultValue="Whitefield, Bangalore, Karnataka" />
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Company Logo</label>
                            <div className="photo-upload-container" style={{ marginBottom: 0 }}>
                                <div className="avatar-preview" style={{ borderRadius: '12px' }}>
                                    <FiShield />
                                </div>
                                <div className="upload-actions">
                                    <button className="btn-outline"><FiUpload /> Upload Logo</button>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-primary"><FiSave /> Update Company Info</button>
                        </div>
                    </motion.div>
                )
            case 'notifications':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="settings-card"
                    >
                        <h3 className="card-title"><FiBell /> Notification Settings</h3>
                        <div className="toggle-list">
                            {[
                                { title: 'New Order Notifications', desc: 'Receive alerts when a new installation or product order is placed.', default: true },
                                { title: 'Employee Task Alerts', desc: 'Get notified when tasks are assigned, updated or completed.', default: true },
                                { title: 'Email Notifications', desc: 'Send daily reports and system alerts to admin email.', default: false },
                                { title: 'SMS Notifications', desc: 'Critical alerts sent via SMS for emergency system status.', default: true },
                            ].map((item, idx) => (
                                <div key={idx} className="toggle-group">
                                    <div className="toggle-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked={item.default} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-primary"><FiSave /> Save Notification Preferences</button>
                        </div>
                    </motion.div>
                )
            case 'security':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="settings-card"
                    >
                        <h3 className="card-title"><FiShield /> Security Settings</h3>
                        <div className="toggle-group" style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                            <div className="toggle-info">
                                <h4>Two Factor Authentication (2FA)</h4>
                                <p>Add an extra layer of security to your admin account.</p>
                            </div>
                            <button className="btn-primary">Enable 2FA</button>
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label>Session Timeout (Minutes)</label>
                            <select defaultValue="30">
                                <option value="15">15 Minutes</option>
                                <option value="30">30 Minutes</option>
                                <option value="60">1 Hour</option>
                                <option value="120">2 Hours</option>
                            </select>
                        </div>

                        <h4 style={{ marginBottom: '1rem', color: '#475569' }}>Login Activity History</h4>
                        <div className="activity-list">
                            {[
                                { browser: 'Chrome on Windows', ip: '192.168.1.1', time: 'Today, 2:30 PM', status: 'Active Now' },
                                { browser: 'Safari on iPhone', ip: '103.45.21.9', time: 'Yesterday, 10:15 AM', status: 'Completed' },
                            ].map((act, idx) => (
                                <div key={idx} className="activity-item">
                                    <div className="activity-icon"><FiLayout /></div>
                                    <div className="activity-details">
                                        <h5>{act.browser}</h5>
                                        <p>IP: {act.ip} • {act.time} • <strong>{act.status}</strong></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )
            case 'permissions':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="settings-card"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="card-title" style={{ marginBottom: 0 }}><FiUsers /> Employee Permission Settings</h3>
                            <button className="btn-primary">+ Add Employee Role</button>
                        </div>
                        <table className="permissions-table">
                            <thead>
                                <tr>
                                    <th>Role Name</th>
                                    <th>Permissions</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Super Admin</td>
                                    <td>Full Access</td>
                                    <td><span className="role-badge role-admin">System Default</span></td>
                                    <td><button className="btn-outline" style={{ padding: '0.4rem 0.8rem' }}>Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Technician</td>
                                    <td>CCTV Views, Task Updates</td>
                                    <td><span className="role-badge role-editor">Active</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn-outline" style={{ padding: '0.4rem 0.8rem' }}>Edit</button>
                                            <button className="btn-danger" style={{ padding: '0.4rem 0.8rem' }}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Customer Support</td>
                                    <td>Users, Enquiries, Orders</td>
                                    <td><span className="role-badge role-viewer">Active</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn-outline" style={{ padding: '0.4rem 0.8rem' }}>Edit</button>
                                            <button className="btn-danger" style={{ padding: '0.4rem 0.8rem' }}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>
                )
            case 'backup':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="settings-card"
                    >
                        <h3 className="card-title"><FiDatabase /> Backup & Data</h3>
                        <div className="form-grid">
                            <div className="settings-card" style={{ background: '#f8fafc', boxShadow: 'none' }}>
                                <h4>Database Backup</h4>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.5rem 0 1.5rem' }}>Last backup: 12 hours ago</p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn-primary"><FiRefreshCw /> Run Backup Now</button>
                                    <button className="btn-outline" onClick={() => handleDownload('Database_Backup', 'sql')}><FiDownload /> Download SQL</button>
                                </div>
                            </div>
                            <div className="settings-card" style={{ background: '#f8fafc', boxShadow: 'none' }}>
                                <h4>Export Reports</h4>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.5rem 0 1.5rem' }}>Generate system-wide analytics reports.</p>
                                <button className="btn-outline" onClick={() => handleDownload('System_Report', 'pdf')}><FiDownload /> Export CSV / PDF</button>
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px dashed #e2e8f0', borderRadius: '12px' }}>
                            <h4 style={{ color: '#dc2626' }}>Restore System</h4>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.5rem 0 1rem' }}>Caution: Restoring a backup will overwrite current system data.</p>
                            <button className="btn-danger">Restore from Backup</button>
                        </div>
                    </motion.div>
                )
            case 'appearance':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="settings-card"
                    >
                        <h3 className="card-title"><FiLayout /> Appearance Settings</h3>
                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label>Dashboard Theme</label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <div className="theme-option active" style={{
                                    padding: '1.5rem', border: '2px solid #4a6fa5', borderRadius: '12px', cursor: 'pointer',
                                    flex: 1, textAlign: 'center', background: '#f0f4f8'
                                }}>
                                    <FiSun style={{ fontSize: '1.5rem', color: '#4a6fa5', marginBottom: '0.5rem' }} />
                                    <p style={{ fontWeight: 600, color: '#4a6fa5' }}>Light Steel Blue</p>
                                </div>
                                <div className="theme-option" style={{
                                    padding: '1.5rem', border: '2px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer',
                                    flex: 1, textAlign: 'center'
                                }}>
                                    <FiMoon style={{ fontSize: '1.5rem', color: '#64748b', marginBottom: '0.5rem' }} />
                                    <p style={{ fontWeight: 600, color: '#64748b' }}>Modern Dark</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Interface Language</label>
                            <select defaultValue="en">
                                <option value="en">English (US)</option>
                                <option value="en-gb">English (UK)</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                    </motion.div>
                )
            default:
                return null
        }
    }

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Admin Settings</h1>
                <p>Manage your account, firm preferences, and system configurations.</p>
            </div>

            <div className="settings-tabs">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && <motion.div className="tab-indicator" layoutId="activeTab" />}
                    </button>
                ))}
            </div>

            <div className="settings-content-area">
                <AnimatePresence mode="wait">
                    {renderTabContent()}
                </AnimatePresence>
            </div>
        </div>
    )
}
