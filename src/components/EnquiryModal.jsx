import { useState } from 'react'
import { FiX, FiSend, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function EnquiryModal({ product, onClose }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.phone) {
            toast.error('Please fill all required fields')
            return
        }
        setLoading(true)
        // Simulate email send
        await new Promise(r => setTimeout(r, 1500))

        // Save enquiry to localStorage
        const enquiries = JSON.parse(localStorage.getItem('sv_enquiries') || '[]')
        enquiries.push({
            id: Date.now(),
            ...form,
            product: product?.name || 'General Enquiry',
            date: new Date().toISOString(),
            status: 'New',
        })
        localStorage.setItem('sv_enquiries', JSON.stringify(enquiries))

        setLoading(false)
        toast.success('Enquiry submitted! Our team will contact you within 24 hours.')
        onClose()
    }

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-box">
                <div className="modal-header">
                    <div>
                        <h3>Enquiry Now</h3>
                        {product && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>{product.name}</p>}
                    </div>
                    <button className="modal-close" onClick={onClose}><FiX /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label"><FiUser size={13} style={{ marginRight: 6 }} />Full Name *</label>
                            <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FiMail size={13} style={{ marginRight: 6 }} />Email Address *</label>
                            <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FiPhone size={13} style={{ marginRight: 6 }} />Phone Number *</label>
                            <input className="form-input" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FiMessageSquare size={13} style={{ marginRight: 6 }} />Message</label>
                            <textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your security needs..." rows={3} />
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            * You will receive an email confirmation within 24 hours.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                            {loading ? 'Sending...' : <><FiSend size={14} /> Send Enquiry</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
