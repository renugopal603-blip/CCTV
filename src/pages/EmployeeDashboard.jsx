import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiCheckCircle, FiCalendar, FiMapPin, FiPhone } from 'react-icons/fi'

export default function EmployeeDashboard() {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [activeTab, setActiveTab] = useState('Assigned')

    useEffect(() => {
        setBookings(JSON.parse(localStorage.getItem('sv_bookings') || '[]'))
    }, [])

    if (!user || user.role !== 'employee') return <Navigate to="/login" />

    const updateStatus = (id, status) => {
        const updated = bookings.map(b => b.id === id ? { ...b, status } : b)
        setBookings(updated)
        localStorage.setItem('sv_bookings', JSON.stringify(updated))
        toast.success(`Installation ${status}`)
    }

    const myBookings = bookings.filter(b => b.status !== 'Cancelled')

    const tabs = ['Assigned', 'In Progress', 'Completed']
    const filtered = activeTab === 'Assigned' ? myBookings.filter(b => b.status === 'Scheduled' || b.status === 'Assigned') :
        activeTab === 'In Progress' ? myBookings.filter(b => b.status === 'In Progress') :
            myBookings.filter(b => b.status === 'Completed')

    const statusColor = { Scheduled: '#0a4fcf', Assigned: '#d946ef', 'In Progress': '#f97316', Completed: '#16a34a' }

    return (
        <div style={{ paddingTop: 70, minHeight: '100vh', background: 'var(--bg-alt)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
                <div style={{ marginBottom: 32 }}>
                    <h2 style={{ marginBottom: 4 }}>Employee Dashboard</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome, {user.name} · Field Technician</p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
                    {[
                        { label: 'Total Assigned', val: myBookings.length, color: '#0a4fcf' },
                        { label: 'Pending', val: myBookings.filter(b => b.status === 'Scheduled' || b.status === 'Assigned').length, color: '#d946ef' },
                        { label: 'In Progress', val: myBookings.filter(b => b.status === 'In Progress').length, color: '#f97316' },
                        { label: 'Completed', val: myBookings.filter(b => b.status === 'Completed').length, color: '#16a34a' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: 20, textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 4, borderBottom: '2px solid var(--border)', marginBottom: 24 }}>
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '10px 20px', border: 'none', background: 'transparent', fontWeight: 600,
                            cursor: 'pointer', fontSize: '0.9rem',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            borderBottom: `2px solid ${activeTab === tab ? 'var(--primary)' : 'transparent'}`,
                            marginBottom: -2,
                        }}>
                            {tab} ({(tab === 'Assigned' ? myBookings.filter(b => b.status === 'Scheduled' || b.status === 'Assigned').length :
                                tab === 'In Progress' ? myBookings.filter(b => b.status === 'In Progress').length :
                                    myBookings.filter(b => b.status === 'Completed').length)})
                        </button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <div className="card" style={{ padding: 48, textAlign: 'center' }}>
                        <FiCalendar size={40} style={{ opacity: 0.2, display: 'block', margin: '0 auto 16px' }} />
                        <p style={{ color: 'var(--text-muted)' }}>No {activeTab.toLowerCase()} installations</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {filtered.map(b => (
                            <div key={b.id} className="card" style={{ padding: 24 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>{b.id}</span>
                                            <span style={{ padding: '3px 10px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700, background: `color-mix(in srgb, ${statusColor[b.status] || '#0a4fcf'} 12%, transparent)`, color: statusColor[b.status] || '#0a4fcf' }}>{b.status}</span>
                                        </div>
                                        <h4 style={{ marginBottom: 4 }}>{b.name}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{b.product}</p>
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5, justifyContent: 'flex-end' }}>
                                            <FiCalendar size={13} /> {b.date ? new Date(b.date).toLocaleDateString() : 'TBD'}
                                        </div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{b.timeSlot || '-'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><FiPhone size={13} /> {b.phone}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><FiMapPin size={13} /> {b.address || 'Address TBD'}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                    {b.status !== 'Completed' && (
                                        <>
                                            {(b.status === 'Scheduled' || b.status === 'Assigned') && (
                                                <button className="btn btn-primary btn-sm" onClick={() => updateStatus(b.id, 'In Progress')}>
                                                    Start Installation
                                                </button>
                                            )}
                                            {b.status === 'In Progress' && (
                                                <button className="btn btn-sm" style={{ background: '#16a34a', color: 'white' }} onClick={() => updateStatus(b.id, 'Completed')}>
                                                    <FiCheckCircle size={14} /> Mark Completed
                                                </button>
                                            )}
                                        </>
                                    )}
                                    {b.status === 'Completed' && (
                                        <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <FiCheckCircle size={16} /> Installation Completed
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
