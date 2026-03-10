import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    FiUserCheck, FiUserX, FiClock,
    FiCalendar, FiDownload, FiSearch,
    FiFilter, FiMoreVertical
} from 'react-icons/fi'
import './Attendance.css'

export default function Attendance() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

    const STATS = [
        { label: 'Total Present', value: '42', icon: <FiUserCheck />, type: 'present' },
        { label: 'Total Absent', value: '3', icon: <FiUserX />, type: 'absent' },
        { label: 'Late Arrival', value: '5', icon: <FiClock />, type: 'late' },
        { label: 'On Leave', value: '2', icon: <FiCalendar />, type: 'leave' },
    ]

    const EMPLOYEES = [
        { id: 1, name: 'Suresh Raina', role: 'Technician', checkIn: '09:15 AM', status: 'Present', avatar: 'SR' },
        { id: 2, name: 'Priya Sharma', role: 'Support', checkIn: '09:30 AM', status: 'Late', avatar: 'PS' },
        { id: 3, name: 'Amit Kumar', role: 'Technician', checkIn: '-', status: 'Absent', avatar: 'AK' },
        { id: 4, name: 'Rahul Dravid', role: 'Manager', checkIn: '09:00 AM', status: 'Present', avatar: 'RD' },
        { id: 5, name: 'Sneha Patil', role: 'Sales', checkIn: '09:10 AM', status: 'Present', avatar: 'SP' },
        { id: 6, name: 'Vikram Singh', role: 'Technician', checkIn: '-', status: 'On Leave', avatar: 'VS' },
    ]

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'present': return 'status-badge present'
            case 'absent': return 'status-badge absent'
            case 'late': return 'status-badge late'
            case 'on leave': return 'status-badge leave'
            default: return 'status-badge'
        }
    }

    const filteredEmployees = EMPLOYEES.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="attendance-container">
            <div className="attendance-header">
                <div>
                    <h1>Employee Attendance</h1>
                    <p>Monitor and track daily employee presence and reports.</p>
                </div>
                <button className="btn-primary">
                    <FiDownload /> Export Reports
                </button>
            </div>

            <div className="attendance-stats">
                {STATS.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className={`stat-icon ${stat.type}`}>{stat.icon}</div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="attendance-controls">
                <div className="filter-group">
                    <div style={{ position: 'relative' }}>
                        <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search employee..."
                            style={{ paddingLeft: '35px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <input
                        type="date"
                        className="date-input"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
                <button className="action-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiFilter /> More Filters
                </button>
            </div>

            <div className="attendance-card">
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Role</th>
                            <th>Check-In</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td>
                                    <div className="employee-info">
                                        <div className="employee-avatar">{emp.avatar}</div>
                                        <div className="employee-details">
                                            <h4>{emp.name}</h4>
                                            <p>Emp ID: SV-{100 + emp.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{emp.role}</td>
                                <td>{emp.checkIn}</td>
                                <td>
                                    <span className={getStatusClass(emp.status)}>{emp.status}</span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <button className="action-btn">History</button>
                                        <button className="action-btn" style={{ padding: '0.5rem', minWidth: '36px' }} title="More Options">
                                            <FiMoreVertical />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
