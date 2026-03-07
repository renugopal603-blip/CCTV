import { Link } from 'react-router-dom'
import { FiShield, FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi'
import './Footer.css'

const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Services', path: '/services' },
    { label: 'Contact Us', path: '/contact' },
]
const services = [
    { label: 'CCTV Installation', path: '/services' },
    { label: 'Maintenance & AMC', path: '/services' },
    { label: 'Remote Monitoring', path: '/services' },
    { label: 'Bulk Setup', path: '/services' },
    { label: 'Book Installation', path: '/booking' },
]
const socials = [
    { icon: <FiFacebook />, href: '#', label: 'Facebook' },
    { icon: <FiTwitter />, href: '#', label: 'Twitter' },
    { icon: <FiInstagram />, href: '#', label: 'Instagram' },
    { icon: <FiLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FiYoutube />, href: '#', label: 'YouTube' },
]

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__top container">
                {/* Brand */}
                <div className="footer__brand footer__col">
                    <Link to="/" className="footer__logo">
                        <div className="logo-text">
                            <span className="logo-main">Secure</span>
                            <span className="logo-accent">Vision</span>
                        </div>
                    </Link>
                    <p className="footer__tagline">
                        India's most trusted CCTV security solutions provider since 2012. Protecting homes and businesses with cutting-edge surveillance technology.
                    </p>
                    <div className="footer__socials">
                        {socials.map(s => (
                            <a key={s.label} href={s.href} className="social-link" aria-label={s.label}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer__col">
                    <h4 className="footer__heading">Quick Links</h4>
                    <ul className="footer__links">
                        {quickLinks.map(l => (
                            <li key={l.label}><Link to={l.path}>{l.label}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div className="footer__col">
                    <h4 className="footer__heading">Our Services</h4>
                    <ul className="footer__links">
                        {services.map(l => (
                            <li key={l.label}><Link to={l.path}>{l.label}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer__col">
                    <h4 className="footer__heading">Contact Us</h4>
                    <ul className="footer__contact">
                        <li>
                            <FiMapPin size={15} />
                            <span>42, Tech Park, Whitefield<br />Bangalore - 560066, India</span>
                        </li>
                        <li>
                            <FiPhone size={15} />
                            <a href="tel:+918001234567">+91 800 123 4567</a>
                        </li>
                        <li>
                            <FiMail size={15} />
                            <a href="mailto:info@securevision.in">info@securevision.in</a>
                        </li>
                    </ul>
                    <div className="footer__hours">
                        <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
                        <span>Sun: 10:00 AM – 4:00 PM</span>
                    </div>
                </div>
            </div>

            <div className="footer__bottom container">
                <p>© 2026 SecureVision. All rights reserved.</p>
                <div className="footer__bottom-links">
                    <Link to="#">Privacy Policy</Link>
                    <Link to="#">Terms of Service</Link>
                    <Link to="#">Warranty Policy</Link>
                </div>
            </div>
        </footer>
    )
}
