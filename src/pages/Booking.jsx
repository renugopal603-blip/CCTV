import { useState } from 'react'
import BookingModal from '../components/BookingModal'
import { FiCalendar, FiCheckCircle, FiClock, FiPackage } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const included = [
    'Site survey before installation',
    'Professional cable management',
    'DVR/NVR configuration & setup',
    'Mobile app connection & training',
    'System testing & sign-off',
    '90-day installation warranty',
]

export default function Booking() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-banner" style={{ background: '#4682B4', padding: '60px 0', color: '#ffffff', textAlign: 'center' }}>
                <div className="container">
                    <div className="section-tag" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: 16 }}>Book Installation</div>
                    <h1 style={{ color: '#ffffff', fontSize: '3rem', marginBottom: 12 }}>Schedule Your <span style={{ opacity: 0.9 }}>CCTV Installation</span></h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', margin: 0 }}>Professional installation by certified technicians at your doorstep</p>
                </div>
            </div>

            <section className="section">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
                    <div>
                        <h3 style={{ marginBottom: 24 }}>What's Included</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                            {included.map(i => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', fontWeight: 500 }}>
                                    <FiCheckCircle size={16} color="var(--success)" /> {i}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {[
                                { icon: <FiClock size={22} />, title: 'Same-Day Booking', desc: 'Slots available from next business day' },
                                { icon: <FiPackage size={22} />, title: 'Bulk Orders', desc: 'Special rates for 5+ camera setups' },
                                { icon: <FiCalendar size={22} />, title: 'Flexible Timing', desc: '9 AM to 6 PM, Mon–Saturday' },
                                { icon: <FiCheckCircle size={22} />, title: 'Guaranteed Quality', desc: '90-day installation warranty' },
                            ].map(b => (
                                <div key={b.title} className="card" style={{ padding: 20 }}>
                                    <div style={{ color: 'var(--primary)', marginBottom: 10 }}>{b.icon}</div>
                                    <h4 style={{ fontSize: '0.95rem', marginBottom: 5 }}>{b.title}</h4>
                                    <p style={{ fontSize: '0.82rem' }}>{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ padding: 36, textAlign: 'center' }}>
                        <div style={{ width: 80, height: 80, background: 'var(--primary-ultra-light)', borderRadius: 20, margin: '0 auto 20px', display: 'grid', placeItems: 'center', color: 'var(--primary)' }}>
                            <FiCalendar size={36} />
                        </div>
                        <h3 style={{ marginBottom: 12 }}>Ready to Book?</h3>
                        <p style={{ marginBottom: 28, color: 'var(--text-secondary)' }}>
                            Choose your preferred installation date and time. Our professional technician will arrive at your doorstep.
                        </p>
                        <button className="btn btn-accent btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowModal(true)}>
                            <FiCalendar size={18} /> Book Installation Slot
                        </button>
                        <p style={{ marginTop: 16, fontSize: '0.82rem', color: 'var(--text-muted)' }}>No payment required at booking</p>
                        <hr className="divider" />
                        <p style={{ fontSize: '0.9rem', marginBottom: 12 }}>Already purchased a product?</p>
                        <Link to="/products" className="btn btn-outline btn-sm">Browse Products First</Link>
                    </div>
                </div>
            </section>

            {showModal && <BookingModal onClose={() => setShowModal(false)} />}
        </div>
    )
}
