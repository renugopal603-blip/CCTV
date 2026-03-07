import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiShield, FiTool, FiMonitor, FiUsers, FiArrowRight, FiStar, FiCheckCircle, FiPhone, FiEye } from 'react-icons/fi'
import { MdSecurity, MdOutlineInstallMobile } from 'react-icons/md'
import { LuCctv } from 'react-icons/lu'
import BookingModal from '../components/BookingModal'
import VideoModal from '../components/VideoModal'
import { products } from '../data/products'
import './Home.css'

const features = [
    { image: '/hero1.png', title: '4K Ultra HD Surveillance', desc: 'Crystal clear 4K resolution with advanced night vision and AI-powered movement detection.' },
    { image: '/hero2.png', title: 'Smart Home Integration', desc: 'Seamlessly connect your security system with your smart home devices for unified control.' },
    { image: '/hero3.png', title: 'Enterprise Monitoring', desc: 'Professional-grade monitoring solutions for large-scale industrial and commercial complexes.' },
    { image: '/hero1.png', title: 'Instant Cloud Alerts', desc: 'Get real-time notifications on your mobile devices with secure end-to-end encrypted cloud storage.' },
]

const services = [
    { icon: <MdOutlineInstallMobile size={32} />, title: 'CCTV Installation', desc: 'Professional on-site installation of cameras, DVR/NVR systems, and cabling for any property size.', color: '#4682B4' },
    { icon: <FiTool size={32} />, title: 'Maintenance & AMC', desc: 'Annual Maintenance Contracts (AMC) ensuring your system runs at peak performance year-round.', color: '#4682B4' },
    { icon: <FiMonitor size={32} />, title: 'Remote Monitoring', desc: '24/7 professional monitoring services with instant incident response and reporting.', color: '#4682B4' },
    { icon: <FiUsers size={32} />, title: 'Bulk Setup', desc: 'Specialized packages for large-scale deployments — warehouses, campuses, and residential complexes.', color: '#4682B4' },
]

const testimonials = [
    { name: 'Rajesh Kumar', role: 'Home Owner, Bangalore', rating: 5, text: 'Excellent service from SecureVision! The installation team was professional and efficient. My entire home is now covered with crystal-clear 4K cameras. Highly recommended!' },
    { name: 'Priya Sharma', role: 'MD, TechCorp India', rating: 5, text: 'We deployed SecureVision cameras across all 3 of our office locations. The remote monitoring feature is a game-changer. Support team is incredible.' },
    { name: 'Anil Mehta', role: 'Shop Owner, Mumbai', rating: 5, text: 'After installing the NVR kit from SecureVision, I can monitor my shop from my phone anywhere. Great product quality and fair pricing!' },
    { name: 'Sunita Reddy', role: 'Apartment Complex Manager', rating: 5, text: 'SecureVision handled the bulk installation of 48 cameras for our apartment complex. They completed it in just 2 days. Exceptional work!' },
]


export default function Home() {
    const [showBooking, setShowBooking] = useState(false)
    const [showVideo, setShowVideo] = useState(false)
    const [activeTestimonial, setActiveTestimonial] = useState(0)
    const [activeHeroImg, setActiveHeroImg] = useState(0)
    const featuredProducts = products.slice(0, 3)

    const heroImages = ['/hero1.png', '/hero2.png', '/hero3.png']

    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            setActiveTestimonial(v => (v + 1) % testimonials.length)
        }, 5000)

        const heroInterval = setInterval(() => {
            setActiveHeroImg(v => (v + 1) % heroImages.length)
        }, 5000)

        return () => {
            clearInterval(testimonialInterval)
            clearInterval(heroInterval)
        }
    }, [heroImages.length])

    return (
        <div className="home">
            {/* Refined Hero Section */}
            <section className="hero-section">
                <div className="container hero-section__inner">
                    <div className="hero-section__content">
                        <div className="hero-section__tag animate-fadeInUp">
                            <FiShield size={16} /> <span>Smart Security Solutions</span>
                        </div>
                        <h1 className="hero-section__title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                            Next-Gen <span className="hero-section__accent">AI Surveillance</span> for Complete Peace of Mind
                        </h1>
                        <p className="hero-section__desc animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            Experience top-tier security with our smart CCTV solutions. Real-time monitoring, AI detection, and 24/7 support for your home or business.
                        </p>
                        <div className="hero-section__actions animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                            <Link to="/products" className="hero-btn-primary">
                                Get Started <FiArrowRight size={18} />
                            </Link>
                            <button className="hero-btn-secondary" onClick={() => setShowVideo(true)}>
                                Watch Demo
                            </button>
                        </div>
                    </div>
                    <div className="hero-section__visual">
                        <div className="hero-image-wrapper">
                            <img
                                key={activeHeroImg}
                                src={heroImages[activeHeroImg]}
                                alt="Advanced CCTV System"
                                className="hero-main-img animate-fadeIn"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* Why Choose Us */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Why Choose Us</div>
                        <h2 className="section-title">Security You Can <span>Trust</span></h2>
                        <p className="section-subtitle">We combine cutting-edge technology with expert service to deliver unmatched security solutions.</p>
                    </div>
                    <div className="grid-4">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card card">
                                <div className="feature-card__img-container">
                                    <img src={f.image} alt={f.title} className="feature-card__img" />
                                </div>
                                <h4>{f.title}</h4>
                                <p style={{ fontSize: '0.9rem', marginTop: 10 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Logo Slider */}
            <section className="client-slider-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Prestigious Clientele</h2>
                    </div>
                    <div className="client-slider">
                        <div className="client-slider__track">
                            {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((num, i) => (
                                <div key={i} className="client-logo">
                                    <img src={`/client${num}.png?v=2`} alt={`Client ${num}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Our Services</div>
                        <h2 className="section-title">Complete Security <span>Services</span></h2>
                        <p className="section-subtitle">From installation to maintenance, we offer end-to-end security solutions tailored to your needs.</p>
                    </div>
                    <div className="grid-4">
                        {services.map((s, i) => (
                            <div key={i} className="service-card card">
                                <div className="service-card__icon" style={{ '--service-color': s.color }}>
                                    {s.icon}
                                </div>
                                <h4>{s.title}</h4>
                                <p style={{ fontSize: '0.9rem', marginTop: 10, color: 'var(--text-secondary)' }}>{s.desc}</p>
                                <Link to="/services" className="service-card__link">
                                    Learn More <FiArrowRight size={13} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Featured Products</div>
                        <h2 className="section-title">Featured <span>Products</span></h2>
                        <p className="section-subtitle">Explore our bestselling surveillance cameras and security kits.</p>
                    </div>
                    <div className="grid-3">
                        {featuredProducts.map((p) => (
                            <div key={p.id} className="amazon-card">
                                <Link to={`/products/${p.id}`} className="amazon-card__image">
                                    <img src={p.image} alt={p.name} loading="lazy" />
                                    {p.originalPrice > p.price && (
                                        <div className="discount-tag">
                                            {Math.round((1 - p.price / p.originalPrice) * 100)}% OFF
                                        </div>
                                    )}
                                </Link>
                                <div className="amazon-card__content">
                                    <div className="amazon-card__brand">{p.brand}</div>
                                    <Link to={`/products/${p.id}`} className="amazon-card__title">
                                        {p.name}
                                    </Link>
                                    <div className="amazon-card__rating">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar 
                                                    key={i} 
                                                    size={16} 
                                                    fill={i < Math.round(p.rating) ? '#ffa41c' : 'none'} 
                                                    stroke={i < Math.round(p.rating) ? '#ffa41c' : '#cbd5e1'} 
                                                />
                                            ))}
                                        </div>
                                        <span className="review-count">{p.reviews} ratings</span>
                                    </div>
                                    <div className="amazon-card__price-row">
                                        <div className="price-group">
                                            <span className="app-currency">₹</span>
                                            <span className="app-price">{p.price.toLocaleString()}</span>
                                            <span className="app-mrp">M.R.P: <span>₹{p.originalPrice.toLocaleString()}</span></span>
                                        </div>
                                    </div>
                                    <div className="amazon-card__stock-info">
                                        {p.stock === 'In Stock' ? (
                                            <span className="in-stock">In Stock</span>
                                        ) : (
                                            <span className="limited-stock">{p.stock}</span>
                                        )}
                                        <span className="delivery">Free Delivery by SecureVision</span>
                                    </div>
                                    <div className="amazon-card__footer">
                                        <Link to={`/products/${p.id}`} className="btn btn-primary add-to-cart-btn" style={{ width: '100%', justifyContent: 'center' }}>
                                            <FiEye /> View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <Link to="/products" className="btn btn-outline btn-lg">
                            View All Products <FiArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Testimonials</div>
                        <h2 className="section-title">What Our <span>Customers Say</span></h2>
                        <p className="section-subtitle">Over 50,000 satisfied customers across India trust SecureVision.</p>
                    </div>
                    <div className="testimonials">
                        {testimonials.map((t, i) => (
                            <div key={i} className={`testimonial-card card ${i === activeTestimonial ? 'testimonial-card--active' : ''}`} onClick={() => setActiveTestimonial(i)}>
                                <div className="testimonial-card__content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div className="testimonial-card__stars">
                                        {[...Array(t.rating)].map((_, si) => (
                                            <FiStar key={si} size={14} fill="#f59e0b" stroke="#f59e0b" />
                                        ))}
                                    </div>
                                    <p className="testimonial-card__text">"{t.text}"</p>
                                </div>
                                <div className="testimonial-card__author" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                                    <div>
                                        <strong>{t.name}</strong>
                                        <p className="testimonial-role">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Modal */}
            {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}

            {/* Video Demo Modal */}
            {showVideo && <VideoModal videoSrc="/demo_video.mp4" onClose={() => setShowVideo(false)} />}
        </div>
    )
}
