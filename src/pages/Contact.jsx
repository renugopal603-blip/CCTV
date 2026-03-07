import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../components/PageHeader'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
        toast.success('Message sent! We\'ll get back to you within 24 hours.')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    }

    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <PageHeader 
                title="Contact Us" 
                subtitle="We're here to help. Reach out to us for any queries, support, or sales enquiries." 
            />

            <section className="section">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 56, alignItems: 'start' }}>
                    {/* Contact Info */}
                    <div>
                        <h3 style={{ marginBottom: 28, color: '#4682B4' }}>Contact Information</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
                            {[
                                { icon: <FiMapPin size={20} />, label: 'Address', val: '42, Tech Park, Whitefield, Bangalore – 560066, India' },
                                { icon: <FiPhone size={20} />, label: 'Phone', val: '+91 800 123 4567' },
                                { icon: <FiMail size={20} />, label: 'Email', val: 'info@securevision.in' },
                                { icon: <FiClock size={20} />, label: 'Business Hours', val: 'Mon–Sat: 9 AM – 7 PM | Sun: 10 AM – 4 PM' },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                    <div style={{ width: 48, height: 48, background: 'rgba(70, 130, 180, 0.1)', borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', color: '#4682B4', flexShrink: 0 }}>{item.icon}</div>
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: 4 }}>{item.label}</p>
                                        <p style={{ fontSize: '0.9rem' }}>{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map Embed */}
                        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', height: 220, background: 'var(--bg-alt)', position: 'relative' }}>
                            <iframe
                                title="Location Map"
                                src="https://maps.google.com/maps?q=Whitefield,%20Bangalore,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, display: 'block' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card" style={{ padding: 36 }}>
                        <h3 style={{ marginBottom: 8, color: '#4682B4' }}>Send Us a Message</h3>
                        <p style={{ marginBottom: 24, fontSize: '0.9rem' }}>Fill out the form and our team will respond within 24 hours.</p>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email *</label>
                                    <input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input className="form-input" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 XXXXXXXXXX" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <select className="form-select" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                                        <option value="">Select subject</option>
                                        <option>Product Enquiry</option>
                                        <option>Installation Booking</option>
                                        <option>Technical Support</option>
                                        <option>Sales & Pricing</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message *</label>
                                <textarea className="form-textarea" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us what you need..." required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', background: '#4682B4', borderColor: '#4682B4' }} disabled={loading}>
                                {loading ? 'Sending...' : <><FiSend size={16} /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
