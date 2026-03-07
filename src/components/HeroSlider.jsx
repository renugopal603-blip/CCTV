import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowLeft, FiShield, FiMonitor, FiEye, FiCpu, FiTool } from 'react-icons/fi'
import { MdSecurity } from 'react-icons/md'
import './HeroSlider.css'

const slides = [
    {
        id: 1,
        image: '/hero/slide1.jpg',
        tag: 'Smart Home Security',
        tagIcon: <FiShield size={13} />,
        headline: 'Total Home\nSurveillance Control',
        accent: 'From One Dashboard',
        subtitle: 'Monitor every corner of your home in real-time with our AI-powered smart home CCTV system. Crystal-clear 4K feeds, motion alerts, and cloud storage.',
        cta: { label: 'Explore Products', to: '/products' },
        ctaSecondary: { label: 'Book Installation', action: 'booking' },
        pills: ['4K Ultra HD', 'Smart Alerts', 'Cloud Storage'],
        align: 'left',
    },
    {
        id: 2,
        image: '/hero/slide2.jpg',
        tag: 'Corporate Security',
        tagIcon: <FiMonitor size={13} />,
        headline: 'Protect Your\nBusiness, Round',
        accent: 'the Clock',
        subtitle: 'Trusted by 10,000+ enterprises across India. Our professional CCTV systems integrate seamlessly into corporate environments with minimal disruption.',
        cta: { label: 'Enterprise Solutions', to: '/services' },
        ctaSecondary: { label: 'Get a Quote', to: '/contact' },
        pills: ['Enterprise Grade', 'Remote Access', 'ISO Certified'],
        align: 'left',
    },
    {
        id: 3,
        image: '/hero/slide3.jpg',
        tag: 'Night Vision Technology',
        tagIcon: <FiEye size={13} />,
        headline: 'See Everything,\nEven in',
        accent: 'Total Darkness',
        subtitle: 'Advanced StarLight infrared technology delivers sharp, full-color images even in near-zero light conditions — keeping you protected 24/7.',
        cta: { label: 'Night Vision Cameras', to: '/products' },
        ctaSecondary: { label: 'Learn More', to: '/about' },
        pills: ['IR Night Vision', '60m Range', 'Full-Color Dark'],
        align: 'left',
    },
    {
        id: 4,
        image: '/hero/slide4.jpg',
        tag: 'AI-Powered Detection',
        tagIcon: <FiCpu size={13} />,
        headline: 'AI Facial\nRecognition &',
        accent: 'Smart Detection',
        subtitle: 'Next-generation AI-powered surveillance identifies faces, detects intrusions, and triggers instant alerts — all with pinpoint accuracy.',
        cta: { label: 'AI Security Systems', to: '/products' },
        ctaSecondary: { label: 'View Demo', to: '/contact' },
        pills: ['Face Recognition', 'Perimeter Alerts', 'Crowd Analytics'],
        align: 'left',
    },
    {
        id: 5,
        image: '/hero/slide5.jpg',
        tag: 'Professional Installation',
        tagIcon: <FiTool size={13} />,
        headline: 'Expert Installation,\nGuaranteed',
        accent: 'Peace of Mind',
        subtitle: 'Our certified technicians install your security system quickly, cleanly, and correctly — with a 2-year warranty and lifetime technical support.',
        cta: { label: 'Book a Technician', action: 'booking' },
        ctaSecondary: { label: 'Our Services', to: '/services' },
        pills: ['Certified Techs', '2-Year Warranty', 'Same-Day Install'],
        align: 'left',
    },
]

export default function HeroSlider({ onBooking }) {
    const [current, setCurrent] = useState(0)
    const [prev, setPrev] = useState(null)
    const [direction, setDirection] = useState('next')
    const [animating, setAnimating] = useState(false)
    const [paused, setPaused] = useState(false)
    const [progress, setProgress] = useState(0)
    const intervalRef = useRef(null)
    const progressRef = useRef(null)
    const SLIDE_DURATION = 6000

    const goTo = useCallback((index, dir = 'next') => {
        if (animating) return
        setDirection(dir)
        setPrev(current)
        setCurrent(index)
        setAnimating(true)
        setProgress(0)
        setTimeout(() => {
            setPrev(null)
            setAnimating(false)
        }, 900)
    }, [animating, current])

    const next = useCallback(() => {
        goTo((current + 1) % slides.length, 'next')
    }, [current, goTo])

    const prev2 = useCallback(() => {
        goTo((current - 1 + slides.length) % slides.length, 'prev')
    }, [current, goTo])

    useEffect(() => {
        if (paused) {
            clearInterval(intervalRef.current)
            clearInterval(progressRef.current)
            return
        }
        setProgress(0)
        const startTime = Date.now()
        progressRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime
            setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100))
        }, 50)
        intervalRef.current = setInterval(() => {
            next()
        }, SLIDE_DURATION)
        return () => {
            clearInterval(intervalRef.current)
            clearInterval(progressRef.current)
        }
    }, [current, paused, next])

    const slide = slides[current]
    const prevSlide = prev !== null ? slides[prev] : null

    return (
        <section
            className="hero-slider"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Hero Image Slider"
        >
            <div className="hero-slider__container container">
                {/* Left Side: Content */}
                <div className={`hero-slider__content hero-slider__content--${slide.align}`}>
                    <div className={`hero-slider__text hs-anim ${animating ? 'hs-anim--out' : 'hs-anim--in'}`}>
                        <div className="hero-slider__tag">
                            {slide.tagIcon}
                            <span>{slide.tag}</span>
                        </div>
                        <h1 className="hero-slider__headline">
                            {slide.headline.split('\n').map((line, i) => (
                                <span key={i} className="hs-line" style={{ animationDelay: `${i * 0.08}s` }}>
                                    {line}
                                    {i < slide.headline.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                            {' '}
                            <span className="hero-slider__accent">{slide.accent}</span>
                        </h1>
                        <p className="hero-slider__subtitle">{slide.subtitle}</p>
                        <div className="hero-slider__pills">
                            {slide.pills.map((p, i) => (
                                <span key={i} className="hero-slider__pill" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                                    <MdSecurity size={11} /> {p}
                                </span>
                            ))}
                        </div>
                        <div className="hero-slider__ctas">
                            {slide.cta.to ? (
                                <Link to={slide.cta.to} className="hs-btn hs-btn--primary">
                                    {slide.cta.label} <FiArrowRight size={15} />
                                </Link>
                            ) : (
                                <button className="hs-btn hs-btn--primary" onClick={onBooking}>
                                    {slide.cta.label} <FiArrowRight size={15} />
                                </button>
                            )}
                            {slide.ctaSecondary.to ? (
                                <Link to={slide.ctaSecondary.to} className="hs-btn hs-btn--ghost">
                                    {slide.ctaSecondary.label}
                                </Link>
                            ) : (
                                <button className="hs-btn hs-btn--ghost" onClick={onBooking}>
                                    {slide.ctaSecondary.label}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Slider */}
                <div className="hero-slider__visual">
                    <div className="hero-slider__visual-inner">
                        {prevSlide && (
                            <div
                                className={`hero-slider__bg hero-slider__bg--prev hero-slider__bg--exit-${direction}`}
                                style={{ backgroundImage: `url(${prevSlide.image})` }}
                            />
                        )}
                        <div
                            className={`hero-slider__bg hero-slider__bg--current hero-slider__bg--enter-${direction} ${animating ? 'hero-slider__bg--animating' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                    </div>
                    <div className="hero-slider__overlay" />
                    <div className="hero-slider__noise" />
                </div>
            </div>

            {/* Navigation Arrows */}
            <button className="hero-slider__nav hero-slider__nav--prev" onClick={prev2} aria-label="Previous slide">
                <FiArrowLeft size={22} />
            </button>
            <button className="hero-slider__nav hero-slider__nav--next" onClick={next} aria-label="Next slide">
                <FiArrowRight size={22} />
            </button>

            {/* Bottom Controls */}
            <div className="hero-slider__controls">
                <div className="hero-slider__dots">
                    {slides.map((s, i) => (
                        <button
                            key={i}
                            className={`hero-slider__dot ${i === current ? 'active' : ''}`}
                            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                            aria-label={`Go to slide ${i + 1}: ${s.tag}`}
                        >
                            {i === current && (
                                <span
                                    className="hero-slider__dot-progress"
                                    style={{ width: `${progress}%`, display: 'block', height: '100%', borderRadius: 'inherit' }}
                                />
                            )}
                        </button>
                    ))}
                </div>
                <div className="hero-slider__counter">
                    <span className="hs-count-current">{String(current + 1).padStart(2, '0')}</span>
                    <span className="hs-count-total"> / {String(slides.length).padStart(2, '0')}</span>
                </div>
            </div>
        </section>
    )
}
