import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiStar, FiShoppingCart, FiCalendar, FiMessageCircle, FiShield, FiArrowLeft, FiPackage, FiPlayCircle } from 'react-icons/fi'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import EnquiryModal from '../components/EnquiryModal'
import BookingModal from '../components/BookingModal'
import './ProductDetail.css'

const sampleReviews = [
    { name: 'Suresh K.', rating: 5, date: 'Jan 2026', text: 'Excellent quality! The 4K clarity is outstanding. Setup was easy and the night vision is impressive.' },
    { name: 'Meena R.', rating: 4, date: 'Dec 2025', text: 'Very satisfied with the product. Installation team was professional. Minor issue with the app initially but support resolved it quickly.' },
    { name: 'Arjun P.', rating: 5, date: 'Nov 2025', text: 'Best investment for home security. Image quality is crystal clear. Highly recommend to everyone.' },
]

export default function ProductDetail() {
    const { id } = useParams()
    const product = products.find(p => p.id === parseInt(id))
    const { addToCart } = useCart()
    const [activeImg, setActiveImg] = useState(0)
    const [showEnquiry, setShowEnquiry] = useState(false)
    const [showBooking, setShowBooking] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')

    if (!product) {
        return (
            <div className="not-found">
                <h2>Product not found</h2>
                <Link to="/products" className="btn btn-primary">Back to Products</Link>
            </div>
        )
    }

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)
    const discount = Math.round((1 - product.price / product.originalPrice) * 100)

    return (
        <div className="product-detail">
            {/* Breadcrumb Section */}
            <div className="breadcrumb-bar">
                <div className="container breadcrumb">
                    <Link to="/products"><FiArrowLeft size={14} /> Back to Products</Link>
                    <span>/</span>
                    <Link to="/products">{product.category}</Link>
                    <span>/</span>
                    <span className="breadcrumb__current">{product.name}</span>
                </div>
            </div>

            <div className="container pd-layout">
                {/* Left Side: Visual Assets */}
                <div className="pd-gallery">
                    <div className="pd-main-img">
                        <img src={product.images[activeImg]} alt={product.name} />
                        {discount > 0 && <span className="pd-discount-badge">{discount}% OFF</span>}
                    </div>
                    {product.images.length > 1 && (
                        <div className="pd-thumbnails">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    className={`pd-thumb ${i === activeImg ? 'active' : ''}`}
                                    onClick={() => setActiveImg(i)}
                                >
                                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                    
                    {/* Integrated Demo Video */}
                    <div className="pd-video-wrap">
                        <div className="pd-video-label">
                            <FiPlayCircle size={18} /> Product Demo & Installation
                        </div>
                        <video controls className="pd-video" poster={product.image}>
                            <source src={product.videoUrl} type="video/mp4" />
                            Browser video support required.
                        </video>
                    </div>
                </div>

                {/* Right Side: Essential Product Information */}
                <div className="pd-info">
                    <span className="pd-category">{product.category}</span>
                    <h1 className="pd-title">{product.name}</h1>

                    <div className="pd-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <FiStar 
                                    key={i} 
                                    size={18} 
                                    fill={i < Math.round(product.rating) ? '#f59e0b' : 'none'} 
                                    stroke={i < Math.round(product.rating) ? '#f59e0b' : '#cbd5e1'} 
                                />
                            ))}
                        </div>
                        <span className="pd-rating-num">{product.rating}</span>
                        <span className="pd-reviews">({product.reviews} reviews)</span>
                    </div>

                    <div className="pd-price">
                        <div className="pd-price-wrap">
                            <span className="pd-price-current">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                                <span className="pd-price-original">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                        </div>
                    </div>

                    <div className="pd-meta">
                        <div className="pd-meta-item">
                            <span className={`badge ${product.stock === 'In Stock' ? 'badge-success' : 'badge-warning'}`}>
                                <FiPackage size={14} /> {product.stock}
                            </span>
                        </div>
                        <div className="pd-meta-item">
                            <FiShield size={16} /> <span>{product.warranty} Official Warranty</span>
                        </div>
                    </div>

                    <p className="pd-short-desc">{product.description.slice(0, 200)}...</p>

                    <div className="pd-features">
                        {product.features.map(f => (
                            <span key={f} className="pd-feature-tag">{f}</span>
                        ))}
                    </div>

                    {/* Shopping controls */}
                    <div className="pd-quantity">
                        <span className="form-label">Selection Quantity</span>
                        <div className="qty-control">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} aria-label="Increase quantity">+</button>
                        </div>
                    </div>

                    {/* Action Hub */}
                    <div className="pd-actions">
                        <button className="btn btn-ghost" onClick={() => addToCart(product, quantity)}>
                            <FiShoppingCart size={18} /> Add to Cart
                        </button>
                        <button className="btn btn-primary" onClick={() => setShowEnquiry(true)}>
                            <FiMessageCircle size={18} /> Send Enquiry
                        </button>
                        <button className="btn btn-accent" onClick={() => setShowBooking(true)}>
                            <FiCalendar size={18} /> Book Professional Installation
                        </button>
                    </div>

                    <div className="pd-trust">
                        {['ISO 9001 Certified', '100% Genuine Product', 'Free Secure Delivery'].map(t => (
                            <span key={t} className="pd-trust-item">
                                <FiShield size={14} /> {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs: Description / Specs / Reviews */}
            <div className="container pd-tabs-section">
                <div className="pd-tabs">
                    {['description', 'specifications', 'reviews'].map(tab => (
                        <button
                            key={tab}
                            className={`pd-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {activeTab === 'description' && (
                    <div className="pd-tab-content">
                        <h3>Product Description</h3>
                        <p>{product.description}</p>
                    </div>
                )}

                {activeTab === 'specifications' && (
                    <div className="pd-tab-content">
                        <h3>Technical Specifications</h3>
                        <table className="specs-table">
                            <tbody>
                                {Object.entries(product.specs).map(([key, val]) => (
                                    <tr key={key}>
                                        <td className="specs-key">{key}</td>
                                        <td className="specs-val">{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="pd-tab-content">
                        <div className="reviews-header">
                            <div className="reviews-avg">
                                <span className="reviews-avg-num">{product.rating}</span>
                                <div className="reviews-avg-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} size={20} fill={i < Math.round(product.rating) ? '#f59e0b' : 'none'} stroke={i < Math.round(product.rating) ? '#f59e0b' : '#cbd5e1'} />
                                    ))}
                                    <span>{product.reviews} Reviews</span>
                                </div>
                            </div>
                        </div>
                        <div className="reviews-list">
                            {sampleReviews.map((r, i) => (
                                <div key={i} className="review-item">
                                    <div className="review-item__header">
                                        <div className="review-avatar">{r.name.charAt(0)}</div>
                                        <div>
                                            <strong>{r.name}</strong>
                                            <div className="review-item__stars">
                                                {[...Array(r.rating)].map((_, si) => <FiStar key={si} size={12} fill="#f59e0b" stroke="#f59e0b" />)}
                                            </div>
                                        </div>
                                        <span className="review-date">{r.date}</span>
                                    </div>
                                    <p className="review-text">{r.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>


            {showEnquiry && <EnquiryModal product={product} onClose={() => setShowEnquiry(false)} />}
            {showBooking && <BookingModal product={product} onClose={() => setShowBooking(false)} />}
        </div>
    )
}
