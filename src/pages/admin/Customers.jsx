import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiSmartphone, FiShield, FiMoreVertical } from 'react-icons/fi'

export default function Customers() {
    const [customers] = useState([
        { id: 101, name: 'Renugopal', email: 'renu@gmail.com', location: 'Whitefield', plans: 'Business Plus', cameras: 8 },
        { id: 102, name: 'Animesh Das', email: 'ani@test.com', location: 'Indiranagar', plans: 'Home Secure', cameras: 4 },
        { id: 103, name: 'Priya Sharma', email: 'priya@corp.com', location: 'Electronic City', plans: 'Ultra HD 24/7', cameras: 12 },
    ])

    return (
        <div className="admin-module">
            <div className="admin-card-large">
                <div className="card-header">
                    <h3>Client Database</h3>
                    <div className="admin-search" style={{ marginRight: 0 }}>
                        <input type="text" placeholder="Filter clients..." style={{ background: '#f8fafc', border: '1px solid #e2e8f0', height: 36, padding: '0 12px', borderRadius: 8 }} />
                    </div>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Customer Account</th>
                                <th>Primary Location</th>
                                <th>Security Package</th>
                                <th>Endpoints</th>
                                <th>Security Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(cust => (
                                <tr key={cust.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div className="admin-avatar" style={{ width: 36, height: 36, background: '#4682B4', color: 'white' }}>{cust.name[0]}</div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{cust.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{cust.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{cust.location}</td>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{cust.plans}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                                            <FiShield size={14} color="#4682B4" />
                                            {cust.cameras} Units
                                        </div>
                                    </td>
                                    <td>
                                        <span className="status-pill online">Protected</span>
                                    </td>
                                    <td>
                                        <button className="action-btn"><FiMoreVertical /></button>
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
