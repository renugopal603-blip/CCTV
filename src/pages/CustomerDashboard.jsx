import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { FiPackage, FiSettings, FiClock, FiPlusCircle, FiHelpCircle, FiChevronRight } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import './CustomerDashboard.css'

export default function CustomerDashboard() {
    const { user } = useAuth()

    const stats = [
        { label: 'Total Orders', value: '12', icon: <FiPackage />, color: '#4682B4' },
        { label: 'Active Services', value: '2', icon: <FiSettings />, color: '#10b981' },
        { label: 'Upcoming AMC', value: 'Jan 2027', icon: <FiClock />, color: '#f59e0b' },
    ]

    const quickActions = [
        { title: 'View My Orders', desc: 'Track shipments and history', link: '/tracking', icon: <FiPackage /> },
        { title: 'Book Installation', desc: 'Expert setup for your products', link: '/booking', icon: <FiPlusCircle /> },
        { title: 'Contact Support', desc: 'Get tech help instantly', link: '/contact', icon: <FiHelpCircle /> },
    ]

    return (
        <div className="dashboard-page">
            <PageHeader 
                title={`Welcome back, ${user?.name?.split(' ')[0]}!`}
                subtitle="Manage your security systems and service requests here."
            />
            
            <div className="container">
                <div className="dashboard-id-wrapper">
                    <div className="dashboard-id">
                        <span>Customer ID: #SV-{user?.id?.slice(-4) || '7724'}</span>
                    </div>
                </div>

            <div className="dashboard-grid">
                {/* Stats Row */}
                <section className="dashboard-stats">
                    {stats.map(s => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: s.color + '15', color: s.color }}>
                                {s.icon}
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">{s.label}</p>
                                <h3 className="stat-value">{s.value}</h3>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="dashboard-main-content">
                    {/* Recent Orders Section */}
                    <section className="dashboard-section recent-orders">
                        <div className="section-header">
                            <h2>Recent Orders</h2>
                            <Link to="/tracking" className="view-all">View All <FiChevronRight /></Link>
                        </div>
                        <div className="orders-table-wrapper">
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#ORD-9921</td>
                                        <td>Mar 05, 2026</td>
                                        <td><span className="status-badge status--shipped">Shipped</span></td>
                                        <td>₹12,499</td>
                                    </tr>
                                    <tr>
                                        <td>#ORD-8812</td>
                                        <td>Feb 20, 2026</td>
                                        <td><span className="status-badge status--delivered">Delivered</span></td>
                                        <td>₹4,500</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Quick Actions sidebar (on desktop) */}
                    <section className="dashboard-section quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="actions-list">
                            {quickActions.map(a => (
                                <Link key={a.title} to={a.link} className="action-card">
                                    <div className="action-icon">{a.icon}</div>
                                    <div className="action-text">
                                        <h4>{a.title}</h4>
                                        <p>{a.desc}</p>
                                    </div>
                                    <FiChevronRight className="action-arrow" />
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    )
}
