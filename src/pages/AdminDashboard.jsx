import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { FiPackage, FiCalendar, FiUsers, FiMessageCircle, FiBox, FiTrendingUp, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import { products } from '../data/products'
import { toast } from 'react-toastify'
import PageHeader from '../components/PageHeader'

const TABS = ['Overview', 'Products', 'Bookings', 'Enquiries', 'Orders', 'Users']

export default function AdminDashboard() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState('Overview')
    const [bookings, setBookings] = useState([])
    const [enquiries, setEnquiries] = useState([])
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        setBookings(JSON.parse(localStorage.getItem('sv_bookings') || '[]'))
        setEnquiries(JSON.parse(localStorage.getItem('sv_enquiries') || '[]'))
        setOrders(JSON.parse(localStorage.getItem('sv_orders') || '[]'))
        setUsers(JSON.parse(localStorage.getItem('sv_users') || '[]'))
    }, [])

    if (!user || user.role !== 'admin') return <Navigate to="/login" />

    const stats = [
        { label: 'Total Products', value: products.length, icon: <FiBox size={22} />, color: '#0a4fcf' },
        { label: 'Bookings', value: bookings.length, icon: <FiCalendar size={22} />, color: '#f97316' },
        { label: 'Enquiries', value: enquiries.length, icon: <FiMessageCircle size={22} />, color: '#16a34a' },
        { label: 'Orders', value: orders.length, icon: <FiPackage size={22} />, color: '#d946ef' },
    ]

    const updateBookingStatus = (id, status) => {
        const updated = bookings.map(b => b.id === id ? { ...b, status } : b)
        setBookings(updated)
        localStorage.setItem('sv_bookings', JSON.stringify(updated))
        toast.success('Status updated')
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-alt)' }}>
            <PageHeader 
                title="Admin Dashboard" 
                subtitle={`Welcome back, ${user.name}`}
            />
            <div style={{ maxWidth: 1300, margin: '0 auto', padding: '40px 24px' }}>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '2px solid var(--border)', paddingBottom: 0 }}>
                    {TABS.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '10px 20px', border: 'none', background: 'transparent',
                            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            borderBottom: `2px solid ${activeTab === tab ? 'var(--primary)' : 'transparent'}`,
                            marginBottom: -2, transition: 'all 0.2s',
                        }}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {activeTab === 'Overview' && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
                            {stats.map(s => (
                                <div key={s.label} className="card" style={{ padding: 24 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>{s.label}</p>
                                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                                        </div>
                                        <div style={{ width: 48, height: 48, borderRadius: 12, background: `color-mix(in srgb, ${s.color} 12%, transparent)`, display: 'grid', placeItems: 'center', color: s.color }}>
                                            {s.icon}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Bookings */}
                        <div className="card" style={{ padding: 24 }}>
                            <h4 style={{ marginBottom: 20 }}>Recent Bookings</h4>
                            {bookings.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No bookings yet</p> : (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            {['ID', 'Customer', 'Product', 'Date', 'Slot', 'Status'].map(h => (
                                                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.slice(-5).reverse().map(b => (
                                            <tr key={b.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                                <td style={{ padding: '10px 12px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>{b.id}</td>
                                                <td style={{ padding: '10px 12px', fontSize: '0.88rem' }}>{b.name}</td>
                                                <td style={{ padding: '10px 12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{b.product}</td>
                                                <td style={{ padding: '10px 12px', fontSize: '0.82rem' }}>{b.date ? new Date(b.date).toLocaleDateString() : '-'}</td>
                                                <td style={{ padding: '10px 12px', fontSize: '0.82rem' }}>{b.timeSlot || '-'}</td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <select value={b.status} onChange={e => updateBookingStatus(b.id, e.target.value)} style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--white)', cursor: 'pointer' }}>
                                                        {['Scheduled', 'Assigned', 'In Progress', 'Completed', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                )}

                {/* Products Tab */}
                {activeTab === 'Products' && (
                    <div className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h4>Product Management</h4>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                        <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <img src={p.image} alt={p.name} style={{ width: 40, height: 32, objectFit: 'cover', borderRadius: 6 }} />
                                            <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{p.name}</span>
                                        </td>
                                        <td style={{ padding: '10px 12px' }}><span className="badge badge-primary">{p.category}</span></td>
                                        <td style={{ padding: '10px 12px', fontWeight: 600 }}>₹{p.price.toLocaleString()}</td>
                                        <td style={{ padding: '10px 12px' }}><span className={`badge ${p.stock === 'In Stock' ? 'badge-success' : 'badge-warning'}`}>{p.stock}</span></td>
                                        <td style={{ padding: '10px 12px', fontSize: '0.88rem' }}>⭐ {p.rating}</td>
                                        <td style={{ padding: '10px 12px' }}>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="btn btn-ghost btn-icon btn-sm"><FiEye size={14} /></button>
                                                <button className="btn btn-ghost btn-icon btn-sm"><FiEdit size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'Bookings' && (
                    <div className="card" style={{ padding: 24 }}>
                        <h4 style={{ marginBottom: 20 }}>All Bookings ({bookings.length})</h4>
                        {bookings.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No bookings yet</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {bookings.reverse().map(b => (
                                    <div key={b.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 16, alignItems: 'center' }}>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>{b.id}</div>
                                        <div>
                                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{b.name} · {b.phone}</p>
                                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{b.product} · {b.address?.slice(0, 40)}</p>
                                        </div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                                            {b.date ? new Date(b.date).toLocaleDateString() : '-'}<br />{b.timeSlot}
                                        </div>
                                        <select value={b.status} onChange={e => updateBookingStatus(b.id, e.target.value)} style={{ fontSize: '0.8rem', padding: '5px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--white)', cursor: 'pointer' }}>
                                            {['Scheduled', 'Assigned', 'In Progress', 'Completed', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Enquiries Tab */}
                {activeTab === 'Enquiries' && (
                    <div className="card" style={{ padding: 24 }}>
                        <h4 style={{ marginBottom: 20 }}>All Enquiries ({enquiries.length})</h4>
                        {enquiries.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No enquiries yet</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {enquiries.reverse().map(e => (
                                    <div key={e.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <strong>{e.name}</strong>
                                            <span className="badge badge-primary">{e.status || 'New'}</span>
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>{e.email} · {e.phone}</p>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Product: {e.product}</p>
                                        {e.message && <p style={{ fontSize: '0.85rem', marginTop: 6, color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{e.message}"</p>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'Orders' && (
                    <div className="card" style={{ padding: 24 }}>
                        <h4 style={{ marginBottom: 20 }}>All Orders ({orders.length})</h4>
                        {orders.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No orders yet</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {orders.reverse().map(o => (
                                    <div key={o.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 16, alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem', marginBottom: 4 }}>{o.id}</p>
                                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{o.items?.length} item(s) · {new Date(o.date).toLocaleDateString()}</p>
                                        </div>
                                        <div style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>₹{o.total?.toLocaleString()}</div>
                                        <span className="badge badge-success">{o.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'Users' && (
                    <div className="card" style={{ padding: 24 }}>
                        <h4 style={{ marginBottom: 20 }}>Registered Users ({users.length})</h4>
                        {users.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No registered users yet</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                        {['Name', 'Email', 'Phone', 'Role', 'Joined'].map(h => (
                                            <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                            <td style={{ padding: '10px 12px', fontWeight: 500 }}>{u.name}</td>
                                            <td style={{ padding: '10px 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{u.email}</td>
                                            <td style={{ padding: '10px 12px', fontSize: '0.85rem' }}>{u.phone || '-'}</td>
                                            <td style={{ padding: '10px 12px' }}><span className="badge badge-primary">{u.role || 'customer'}</span></td>
                                            <td style={{ padding: '10px 12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
