import { useEffect, useState } from 'react'
import { FiPackage, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const statusSteps = {
    'Confirmed': 1, 'Processing': 2, 'Shipped': 3, 'Delivered': 4,
}

export default function OrderTracking() {
    const [orders, setOrders] = useState([])
    const [bookings, setBookings] = useState([])
    const [activeTab, setActiveTab] = useState('Orders')

    useEffect(() => {
        setOrders(JSON.parse(localStorage.getItem('sv_orders') || '[]'))
        setBookings(JSON.parse(localStorage.getItem('sv_bookings') || '[]'))
    }, [])

    const bgColor = { Confirmed: '#0a4fcf', Processing: '#d946ef', Shipped: '#f97316', Delivered: '#16a34a', Scheduled: '#0a4fcf', Completed: '#16a34a', Cancelled: '#dc2626', 'In Progress': '#f97316' }

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-banner" style={{ background: '#4682B4', padding: '60px 0', color: '#ffffff', textAlign: 'center' }}>
                <div className="container">
                    <div className="section-tag" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: 16 }}>My Account</div>
                    <h1 style={{ color: '#ffffff', fontSize: '3rem', marginBottom: 12 }}>Order <span style={{ opacity: 0.9 }}>Tracking</span></h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', margin: 0 }}>Track your orders and installation bookings</p>
                </div>
            </div>

            <div className="container section">
                <div style={{ display: 'flex', gap: 4, borderBottom: '2px solid var(--border)', marginBottom: 28 }}>
                    {['Orders', 'Bookings'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '10px 24px', border: 'none', background: 'transparent', fontWeight: 600,
                            cursor: 'pointer', fontSize: '0.95rem',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            borderBottom: `2px solid ${activeTab === tab ? 'var(--primary)' : 'transparent'}`,
                            marginBottom: -2,
                        }}>
                            {tab} ({tab === 'Orders' ? orders.length : bookings.length})
                        </button>
                    ))}
                </div>

                {activeTab === 'Orders' && (
                    orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <FiPackage size={56} style={{ opacity: 0.2, display: 'block', margin: '0 auto 16px' }} />
                            <h3 style={{ color: 'var(--text-muted)' }}>No orders yet</h3>
                            <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>Shop Now</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {orders.reverse().map(order => (
                                <div key={order.id} className="card" style={{ padding: 28 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Order ID</p>
                                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>{order.id}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Order Date</p>
                                            <p style={{ fontSize: '0.88rem', fontWeight: 600 }}>{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div style={{ marginBottom: 20 }}>
                                        {order.items?.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                                                <img src={item.image} alt={item.name} style={{ width: 52, height: 42, objectFit: 'cover', borderRadius: 8 }} />
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</p>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                                                </div>
                                                <p style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                                        <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                                            Total: <span style={{ color: 'var(--primary)' }}>₹{order.total?.toLocaleString()}</span>
                                        </div>
                                        <span style={{ padding: '5px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 700, background: `color-mix(in srgb, ${bgColor[order.status] || '#0a4fcf'} 12%, transparent)`, color: bgColor[order.status] || '#0a4fcf' }}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}

                {activeTab === 'Bookings' && (
                    bookings.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <FiCalendar size={56} style={{ opacity: 0.2, display: 'block', margin: '0 auto 16px' }} />
                            <h3 style={{ color: 'var(--text-muted)' }}>No bookings yet</h3>
                            <Link to="/booking" className="btn btn-accent" style={{ marginTop: 16 }}>Book Installation</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[...bookings].reverse().map(b => (
                                <div key={b.id} className="card" style={{ padding: 24 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', marginBottom: 5 }}>{b.id}</p>
                                            <h4 style={{ marginBottom: 6 }}>{b.product}</h4>
                                            <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><FiCalendar size={13} /> {b.date ? new Date(b.date).toLocaleDateString() : 'TBD'}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><FiClock size={13} /> {b.timeSlot || '-'}</span>
                                            </div>
                                        </div>
                                        <span style={{ padding: '5px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 700, background: `color-mix(in srgb, ${bgColor[b.status] || '#0a4fcf'} 12%, transparent)`, color: bgColor[b.status] || '#0a4fcf' }}>
                                            {b.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
