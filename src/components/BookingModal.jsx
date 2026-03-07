import { useState } from 'react'
import { FiX, FiCalendar, FiClock, FiMapPin, FiUser, FiPhone, FiCheckCircle } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import { toast } from 'react-toastify'
import { addDays } from 'date-fns'

const timeSlots = [
    '9:00 AM – 11:00 AM',
    '11:00 AM – 1:00 PM',
    '2:00 PM – 4:00 PM',
    '4:00 PM – 6:00 PM',
]

export default function BookingModal({ product, onClose }) {
    const [step, setStep] = useState(1)
    const [form, setForm] = useState({
        name: '', phone: '', address: '', date: null, timeSlot: '', isBulk: false, quantity: 1,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleNext = () => {
        if (!form.name || !form.phone || !form.address) {
            toast.error('Please fill all required fields')
            return
        }
        setStep(2)
    }

    const handleSubmit = async () => {
        if (!form.date || !form.timeSlot) {
            toast.error('Please select a date and time slot')
            return
        }
        setLoading(true)
        await new Promise(r => setTimeout(r, 1600))

        const bookings = JSON.parse(localStorage.getItem('sv_bookings') || '[]')
        const booking = {
            id: `BK${Date.now()}`,
            ...form,
            date: form.date?.toISOString(),
            product: product?.name || 'General Installation',
            status: 'Scheduled',
            createdAt: new Date().toISOString(),
        }
        bookings.push(booking)
        localStorage.setItem('sv_bookings', JSON.stringify(bookings))

        setLoading(false)
        setStep(3)
    }

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-box" style={{ maxWidth: 560 }}>
                <div className="modal-header">
                    <div>
                        <h3>Book Installation Slot</h3>
                        {product && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>{product.name}</p>}
                    </div>
                    <button className="modal-close" onClick={onClose}><FiX /></button>
                </div>

                {step === 1 && (
                    <>
                        <div className="modal-body">
                            <div className="booking-steps">
                                <div className="booking-step active"><span>1</span> Your Details</div>
                                <div className="booking-step"><span>2</span> Schedule</div>
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FiUser size={13} style={{ marginRight: 6 }} />Full Name *</label>
                                <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FiPhone size={13} style={{ marginRight: 6 }} />Phone Number *</label>
                                <input className="form-input" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FiMapPin size={13} style={{ marginRight: 6 }} />Installation Address *</label>
                                <textarea className="form-textarea" name="address" value={form.address} onChange={handleChange} placeholder="Full installation address..." rows={2} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <input type="checkbox" id="isBulk" name="isBulk" checked={form.isBulk} onChange={handleChange} style={{ width: 16, height: 16, cursor: 'pointer' }} />
                                <label htmlFor="isBulk" style={{ fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer' }}>Bulk Order Installation</label>
                            </div>
                            {form.isBulk && (
                                <div className="form-group">
                                    <label className="form-label">Number of Cameras</label>
                                    <input className="form-input" name="quantity" type="number" min="2" value={form.quantity} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
                            <button className="btn btn-primary btn-sm" onClick={handleNext}>Next: Schedule →</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="modal-body">
                            <div className="booking-steps">
                                <div className="booking-step done"><span>✓</span> Your Details</div>
                                <div className="booking-step active"><span>2</span> Schedule</div>
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FiCalendar size={13} style={{ marginRight: 6 }} />Select Date *</label>
                                <DatePicker
                                    selected={form.date}
                                    onChange={date => setForm(f => ({ ...f, date }))}
                                    minDate={addDays(new Date(), 1)}
                                    maxDate={addDays(new Date(), 30)}
                                    placeholderText="Select installation date"
                                    dateFormat="MMMM d, yyyy"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FiClock size={13} style={{ marginRight: 6 }} />Select Time Slot *</label>
                                <div className="time-slots">
                                    {timeSlots.map(slot => (
                                        <button
                                            key={slot}
                                            type="button"
                                            className={`time-slot-btn ${form.timeSlot === slot ? 'active' : ''}`}
                                            onClick={() => setForm(f => ({ ...f, timeSlot: slot }))}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="booking-summary">
                                <h4>Booking Summary</h4>
                                <div className="booking-summary__row"><span>Name</span><strong>{form.name}</strong></div>
                                <div className="booking-summary__row"><span>Phone</span><strong>{form.phone}</strong></div>
                                {form.isBulk && <div className="booking-summary__row"><span>Cameras</span><strong>{form.quantity}</strong></div>}
                                <div className="booking-summary__row"><span>Product</span><strong>{product?.name || 'General'}</strong></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost btn-sm" onClick={() => setStep(1)}>← Back</button>
                            <button className="btn btn-accent btn-sm" onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Confirming...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <div className="modal-body" style={{ textAlign: 'center', padding: '40px 28px' }}>
                        <div className="booking-success-icon"><FiCheckCircle size={48} /></div>
                        <h3 style={{ marginTop: 20, marginBottom: 10, color: 'var(--success)' }}>Booking Confirmed!</h3>
                        <p style={{ marginBottom: 8, color: 'var(--text-secondary)' }}>
                            Your installation has been scheduled for
                        </p>
                        <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: 20 }}>
                            {form.date?.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · {form.timeSlot}
                        </p>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 28 }}>
                            Our technician will contact you 1 hour before the appointment.
                        </p>
                        <button className="btn btn-primary" onClick={onClose}>Done</button>
                    </div>
                )}
            </div>

            <style>{`
        .booking-steps { display: flex; gap: 8px; margin-bottom: 24px; }
        .booking-step { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
        .booking-step span { width: 24px; height: 24px; border: 2px solid var(--border); border-radius: 50%; display: grid; place-items: center; font-size: 0.75rem; font-weight: 700; }
        .booking-step.active { color: var(--primary); }
        .booking-step.active span { border-color: var(--primary); color: var(--primary); background: var(--primary-ultra-light); }
        .booking-step.done span { border-color: var(--success); background: var(--success); color: white; }
        .time-slots { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .time-slot-btn { padding: 10px 12px; border: 1.5px solid var(--border); border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 500; background: var(--white); color: var(--text-secondary); transition: all var(--transition); cursor: pointer; }
        .time-slot-btn:hover { border-color: var(--primary); color: var(--primary); }
        .time-slot-btn.active { border-color: var(--primary); background: var(--primary); color: white; }
        .booking-summary { background: var(--bg-alt); border-radius: var(--radius-md); padding: 16px; margin-top: 20px; }
        .booking-summary h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; color: var(--text-primary); }
        .booking-summary__row { display: flex; justify-content: space-between; font-size: 0.875rem; padding: 5px 0; border-bottom: 1px solid var(--border-light); }
        .booking-summary__row:last-child { border-bottom: none; }
        .booking-summary__row span { color: var(--text-muted); }
        .booking-success-icon { width: 88px; height: 88px; margin: 0 auto; background: #dcfce7; border-radius: 50%; display: grid; place-items: center; color: var(--success); }
      `}</style>
        </div>
    )
}
