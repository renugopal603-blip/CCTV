import { FiTool, FiMonitor, FiUsers, FiShield, FiCheckCircle, FiPhone } from 'react-icons/fi'
import { MdOutlineInstallMobile } from 'react-icons/md'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const services = [
    {
        icon: <MdOutlineInstallMobile size={36} />, color: '#4682B4',
        title: 'CCTV Installation',
        desc: 'Our certified technicians install CCTV systems for homes, offices, warehouses, malls, hospitals, and any property. We handle site surveys, cable routing, camera positioning, and NVR/DVR setup.',
        features: ['Site Survey & Planning', 'Professional Cable Routing', 'Camera & DVR Setup', 'App Configuration', 'User Training', '1-Year Service Warranty'],
        price: 'Starting ₹2,999',
    },
    {
        icon: <FiTool size={36} />, color: '#4682B4',
        title: 'Maintenance & AMC',
        desc: 'Keep your security system running at peak performance with our Annual Maintenance Contracts. Regular servicing, remote diagnostics, and priority support are included.',
        features: ['Quarterly Checkups', 'Remote Diagnostics', 'Camera Cleaning', 'DVR/NVR Optimization', 'Priority Support', 'HDD Health Monitoring'],
        price: 'Starting ₹4,999/year',
    },
    {
        icon: <FiMonitor size={36} />, color: '#4682B4',
        title: 'Remote Monitoring',
        desc: '24/7 professional monitoring of your property by our trained security analysts. Instant incident alerts, real-time surveillance, and cloud-based video storage.',
        features: ['24/7 Live Monitoring', 'Instant Alert Calls', 'Cloud Storage 30 Days', 'Monthly Reports', 'Police Escalation', 'Event-based Recording'],
        price: 'Starting ₹999/month',
    },
    {
        icon: <FiUsers size={36} />, color: '#4682B4',
        title: 'Bulk / Enterprise Setup',
        desc: 'Specialized solutions for large enterprises, residential complexes, shopping malls, industrial units, and government institutions. Custom quotes with volume discounts.',
        features: ['Custom Design Blueprints', 'Dedicated Project Manager', 'Centralized Management', 'Multiple Location Support', 'Volume Discounts', 'SLA-backed Support'],
        price: 'Custom Pricing',
    },
]

export default function Services() {
    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <PageHeader 
                title="Our Services" 
                subtitle="Professional security surveillance solutions tailored for homes and enterprises." 
            />

            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                        {services.map((s, i) => (
                            <div key={s.title} className="card" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 36, padding: 36, alignItems: 'start', border: '1px solid #e2e8f4' }}>
                                <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(70, 130, 180, 0.1)', color: '#4682B4', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: 10, color: '#4682B4' }}>{s.title}</h3>
                                    <p style={{ marginBottom: 20, maxWidth: 620, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{s.desc}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                                        {s.features.map(f => (
                                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                <FiCheckCircle size={13} color="#4682B4" /> {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: '#4682B4', marginBottom: 12 }}>{s.price}</p>
                                    <Link to="/booking" className="btn btn-primary btn-sm" style={{ background: '#4682B4', borderColor: '#4682B4' }}>Book Now</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: '#ffffff', borderTop: '1px solid #f1f5fd', padding: '80px 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ background: 'rgba(70, 130, 180, 0.1)', width: 80, height: 80, borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 24px', color: '#4682B4' }}>
                        <FiShield size={40} />
                    </div>
                    <h2 style={{ color: '#4682B4', marginBottom: 14 }}>Not Sure Which Service You Need?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>Our security experts will assess your property and recommend the best solution — for free!</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                        <a href="tel:+918001234567" className="btn btn-lg" style={{ background: '#4682B4', color: 'white' }}>
                            <FiPhone size={16} /> Call for Free Consultation
                        </a>
                        <Link to="/contact" className="btn btn-lg" style={{ border: '2px solid #4682B4', color: '#4682B4' }}>
                            Send Enquiry
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
