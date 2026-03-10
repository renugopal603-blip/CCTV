import { useState, useEffect } from 'react'
import { FiUser, FiPhone, FiMail, FiEdit, FiTrash2, FiUserCheck } from 'react-icons/fi'

export default function Employees() {
    const [employees, setEmployees] = useState([
        { id: 'EMP001', name: 'Raj Kumar', role: 'Chief Technician', email: 'raj@securevision.in', phone: '+91 98765 00001', status: 'On Site' },
        { id: 'EMP002', name: 'Sarah Khan', role: 'Security Architect', email: 'sarah@securevision.in', phone: '+91 98765 00002', status: 'Available' },
        { id: 'EMP003', name: 'Vijay Singh', role: 'Installation Expert', email: 'vijay@securevision.in', phone: '+91 98765 00003', status: 'In Transit' },
    ])

    return (
        <div className="admin-module">
            <div className="admin-card-large">
                <div className="card-header">
                    <h3>Service Team Management</h3>
                    <button className="admin-login-btn" style={{ width: 'auto', height: 40, padding: '0 20px', fontSize: '0.85rem' }}>+ Hire Employee</button>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Role</th>
                                <th>Contact</th>
                                <th>Current Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div className="admin-avatar" style={{ width: 36, height: 36, background: '#f1f5f9', color: '#4682B4' }}><FiUser /></div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{emp.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ID: {emp.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="status-pill online" style={{ background: '#f1f5f9', color: '#4682B4' }}>
                                            {emp.role}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiMail size={12} /> {emp.email}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}><FiPhone size={12} /> {emp.phone}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="status-pill online">
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="action-btn"><FiUserCheck size={14} /></button>
                                            <button className="action-btn"><FiEdit size={14} /></button>
                                            <button className="action-btn delete"><FiTrash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
