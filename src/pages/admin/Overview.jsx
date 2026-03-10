import { FiVideo, FiUsers, FiUserCheck, FiActivity, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'

export default function Overview() {
    const stats = [
        { label: 'Total Cameras', value: '48', icon: <FiVideo />, color: 'blue', trend: '+4', up: true },
        { label: 'Active Cameras', value: '45', icon: <FiActivity />, color: 'green', trend: 'Stable', up: true },
        { label: 'Offline Cameras', value: '03', icon: <FiActivity />, color: 'red', trend: '-2', up: false },
        { label: 'Total Employees', value: '12', icon: <FiUserCheck />, color: 'purple', trend: '+1', up: true },
        { label: 'Total Customers', value: '124', icon: <FiUsers />, color: 'orange', trend: '+12', up: true },
    ]

    return (
        <div className="admin-overview">
            <div className="admin-overview-grid">
                {stats.map(s => (
                    <div key={s.label} className="stat-card">
                        <div className="stat-info">
                            <span className="stat-label">{s.label}</span>
                            <div className="stat-value">{s.value}</div>
                            <div className={`stat-trend ${s.up ? 'up' : 'down'}`} style={{ 
                                fontSize: '0.75rem', 
                                marginTop: 8, 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 4,
                                color: s.up ? '#10b981' : '#ef4444'
                            }}>
                                {s.up ? <FiArrowUpRight /> : <FiArrowDownRight />}
                                <span>{s.trend} this week</span>
                            </div>
                        </div>
                        <div className={`stat-icon ${s.color}`}>
                            {s.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-overview-main">
                <div className="admin-card-large">
                    <div className="card-header">
                        <h3>System Health Overview</h3>
                        <button className="btn-text">View Details</button>
                    </div>
                    <div style={{ height: 200, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #cbd5e1' }}>
                        <p style={{ color: '#94a3b8' }}>Network Usage Graph Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
