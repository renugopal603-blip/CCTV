import { useState } from 'react'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()
    const { placeOrder } = useOrders()
    const { user } = useAuth()
    const [ordered, setOrdered] = useState(false)

    const handleOrder = () => {
        if (!user) {
            toast.warning('Please login to place an order')
            return
        }

        const orderData = {
            customerName: user.name,
            customerEmail: user.email,
            items: cartItems,
            total: cartTotal + (cartTotal >= 5000 ? 0 : 499),
        }

        placeOrder(orderData)
        clearCart()
        setOrdered(true)
        toast.success('Order placed successfully! 🎉')
    }

    if (ordered) {
        return (
            <div style={{ paddingTop: 70, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 64 }}>🎉</div>
                <h2 style={{ color: 'var(--success)' }}>Order Placed!</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Thank you for your order. We'll be in touch shortly.</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    <Link to="/tracking" className="btn btn-primary">Track Order</Link>
                    <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="page-banner" style={{ background: '#4682B4', padding: '60px 0', color: '#ffffff', textAlign: 'center' }}>
                <div className="container">
                    <div className="section-tag" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: 12 }}>Shopping Cart</div>
                    <h1 style={{ color: '#ffffff', fontSize: '3rem', margin: 0 }}>Your <span style={{ opacity: 0.9 }}>Cart</span></h1>
                </div>
            </div>

            <div className="container section">
                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <FiShoppingBag size={64} style={{ opacity: 0.2, display: 'block', margin: '0 auto 20px' }} />
                        <h3 style={{ color: 'var(--text-muted)' }}>Your cart is empty</h3>
                        <p style={{ marginBottom: 24 }}>Start adding security products to your cart</p>
                        <Link to="/products" className="btn btn-primary">Explore Products <FiArrowRight size={15} /></Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 36, alignItems: 'start' }}>
                        {/* Cart Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {cartItems.map(item => (
                                <div key={item.id} className="card" style={{ display: 'flex', gap: 20, padding: 20, alignItems: 'center' }}>
                                    <img src={item.image} alt={item.name} style={{ width: 90, height: 72, objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 2 }}>{item.category}</p>
                                        <h4 style={{ fontSize: '1rem', marginBottom: 6 }}>{item.name}</h4>
                                        <p style={{ color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>₹{item.price.toLocaleString()}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                        <button style={{ width: 32, height: 32, border: 'none', background: 'var(--bg-alt)', cursor: 'pointer' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus size={13} /></button>
                                        <span style={{ width: 36, textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                                        <button style={{ width: 32, height: 32, border: 'none', background: 'var(--bg-alt)', cursor: 'pointer' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus size={13} /></button>
                                    </div>
                                    <div style={{ textAlign: 'right', minWidth: 100 }}>
                                        <p style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '1.05rem' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                    <button className="btn btn-ghost btn-icon" onClick={() => removeFromCart(item.id)} style={{ color: 'var(--danger)', borderColor: '#fee2e2' }}>
                                        <FiTrash2 size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="card" style={{ padding: 28 }}>
                            <h4 style={{ marginBottom: 20 }}>Order Summary</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span>Delivery</span>
                                    <span style={{ color: 'var(--success)' }}>{cartTotal >= 5000 ? 'FREE' : '₹499'}</span>
                                </div>
                                <hr className="divider" />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                                    <span>Total</span>
                                    <span style={{ color: 'var(--primary)' }}>₹{(cartTotal + (cartTotal >= 5000 ? 0 : 499)).toLocaleString()}</span>
                                </div>
                            </div>
                            {cartTotal < 5000 && <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: 16 }}>Add ₹{(5000 - cartTotal).toLocaleString()} more for free delivery</p>}
                            <button className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }} onClick={handleOrder}>
                                Place Order
                            </button>
                            <Link to="/booking" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
                                Book Installation
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
