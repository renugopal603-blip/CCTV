import React from 'react'
import { FiShield, FiUsers, FiTarget, FiAward, FiCheckCircle } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import './About.css'

export default function About() {
    return (
        <div className="about-page">
            <PageHeader 
                title="About Us" 
                subtitle="Your trusted partner in AI-powered security and surveillance since 2012." 
            />

            {/* Content Section */}
            <section className="section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-content">
                            <h2 className="section-title">Our <span>Journey</span></h2>
                            <p>Founded in 2012, SecureVision has grown from a local installation service to India's premier provider of advanced AI-powered surveillance solutions. We believe that security is a fundamental right, and we've dedicated over a decade to making world-class surveillance technology accessible to every home and business.</p>

                        </div>
                        <div className="about-image-side">
                            <div className="image-stack">
                                <img src="/about1.png" alt="Our Office" className="stack-img main" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section section-alt">
                <div className="container">
                    <div className="mission-vision-wrapper">
                        <div className="grid-2">
                            <div className="goal-card card">
                                <FiTarget size={40} className="goal-icon" />
                                <h3>Our Mission</h3>
                                <p>To provide peace of mind through innovative, reliable, and intelligent security solutions that empower our customers to protect what matters most.</p>
                            </div>
                            <div className="goal-card card">
                                <FiShield size={40} className="goal-icon" />
                                <h3>Our Vision</h3>
                                <p>To become India's most innovative security ecosystem, setting the benchmark for AI surveillance and customer-centric service in the digital age.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section values-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why <span>Choose</span> Us?</h2>
                    </div>
                    <div className="grid-3">
                        {[
                            { title: 'Innovation First', desc: 'We constantly integrate the latest AI and cloud features into our camera systems.' },
                            { title: 'Quality Assurance', desc: 'Every product undergoes rigorous testing for durability and performance in Indian conditions.' },
                            { title: 'Trusted Support', desc: 'Our relationship doesn\'t end at installation. We provide lifetime technical assistance.' }
                        ].map((v, i) => (
                            <div key={i} className="value-item">
                                <FiCheckCircle size={20} className="value-icon" />
                                <div>
                                    <h4>{v.title}</h4>
                                    <p>{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
