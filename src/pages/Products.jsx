import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiFilter, FiStar, FiShoppingCart, FiChevronRight, FiChevronDown, FiX, FiEye } from 'react-icons/fi'
import { products, categories as allCategories } from '../data/products'
import { useCart } from '../context/CartContext'
import PageHeader from '../components/PageHeader'
import './Products.css'

export default function Products() {
    const [search, setSearch] = useState('')
    const [selectedCategories, setSelectedCategories] = useState(['All'])
    const [priceRange, setPriceRange] = useState([0, 50000])
    const [minRating, setMinRating] = useState(0)
    const [sortBy, setSortBy] = useState('popular')
    const [showMobileFilters, setShowMobileFilters] = useState(false)
    const { addToCart } = useCart()

    const brands = useMemo(() => ['All', ...new Set(products.map(p => p.brand))], [])
    const [selectedBrands, setSelectedBrands] = useState(['All'])

    const filtered = useMemo(() => {
        return products
            .filter(p => {
                const catMatch = selectedCategories.includes('All') || selectedCategories.includes(p.category)
                const brandMatch = selectedBrands.includes('All') || selectedBrands.includes(p.brand)
                const searchMatch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                                   p.category.toLowerCase().includes(search.toLowerCase())
                const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
                const ratingMatch = p.rating >= minRating
                return catMatch && brandMatch && searchMatch && priceMatch && ratingMatch
            })
            .sort((a, b) => {
                if (sortBy === 'price-low') return a.price - b.price
                if (sortBy === 'price-high') return b.price - a.price
                if (sortBy === 'rating') return b.rating - a.rating
                return b.reviews - a.reviews
            })
    }, [search, selectedCategories, selectedBrands, priceRange, minRating, sortBy])

    const handleCategoryToggle = (cat) => {
        if (cat === 'All') {
            clearFilters()
            return
        }
        // Switch to single-select: simply replace the entire list with the new category
        setSelectedCategories([cat])
    }

    const clearFilters = () => {
        setSearch('')
        setSelectedCategories(['All'])
        setSelectedBrands(['All'])
        setPriceRange([0, 50000])
        setMinRating(0)
        setSortBy('popular')
    }

    return (
        <div className="products-page">
            <PageHeader 
                title="Our Products" 
                subtitle="Explore our wide range of professional AI-powered CCTV cameras and security systems." 
            />
            <div className="container">
                <div className="products-container">
                    {/* Sidebar Filters */}
                    <aside className={`products-sidebar ${showMobileFilters ? 'active' : ''}`}>
                        <div className="sidebar-header">
                            <h3>Filters</h3>
                            <button className="mobile-close" onClick={() => setShowMobileFilters(false)}>
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="filter-group">
                            <h4 className="filter-title">Category</h4>
                            <div className="filter-options">
                                {allCategories.map(cat => (
                                    <label key={cat} className="filter-checkbox">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => handleCategoryToggle(cat)}
                                        />
                                        <span>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="filter-group">
                            <h4 className="filter-title">Price Range</h4>
                            <div className="price-inputs">
                                <div className="price-field">
                                    <span>Min</span>
                                    <input 
                                        type="number" 
                                        value={priceRange[0]} 
                                        onChange={e => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                    />
                                </div>
                                <div className="price-field">
                                    <span>Max</span>
                                    <input 
                                        type="number" 
                                        value={priceRange[1]} 
                                        onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Customer Ratings */}
                        <div className="filter-group">
                            <h4 className="filter-title">Customer Ratings</h4>
                            <div className="filter-options">
                                {[4, 3, 2, 1].map(star => (
                                    <label key={star} className="filter-radio">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === star}
                                            onChange={() => setMinRating(star)}
                                        />
                                        <div className="rating-row">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar 
                                                    key={i} 
                                                    size={14} 
                                                    fill={i < star ? '#f59e0b' : 'none'} 
                                                    stroke={i < star ? '#f59e0b' : '#cbd5e1'} 
                                                />
                                            ))}
                                            <span>& Up</span>
                                        </div>
                                    </label>
                                ))}
                                <button className="clear-rating-btn" onClick={() => setMinRating(0)}>Clear</button>
                            </div>
                        </div>

                        <button className="btn btn-primary reset-filters-btn" onClick={clearFilters}>
                            Clear All Filters
                        </button>
                    </aside>

                    {/* Main Content Area */}
                    <main className="products-main">
                        {/* Top Bar (Search + Sort) */}
                        <div className="products-top-bar">
                            <div className="search-box">
                                <FiSearch />
                                <input
                                    type="text"
                                    placeholder="Search for cameras, NVRs, kits..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="sort-box">
                                <span className="sort-label">Sort by:</span>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                                    <option value="popular">Popularity</option>
                                    <option value="rating">Average Rating</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                            <button className="mobile-filter-trigger" onClick={() => setShowMobileFilters(true)}>
                                <FiFilter /> Filters
                            </button>
                        </div>

                        <div className="results-info">
                            Showing <span>{filtered.length}</span> results for your selection
                        </div>

                        {/* Product Grid */}
                        {filtered.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state__icon">🔍</div>
                                <h3>No products matched your filters</h3>
                                <p>Try adjusting your filters or search terms.</p>
                                <button className="btn btn-outline" onClick={clearFilters}>Reset All Filters</button>
                            </div>
                        ) : (
                            <div className="product-grid">
                                {filtered.map(p => (
                                    <div key={p.id} className="product-card">
                                        <Link to={`/products/${p.id}`} className="product-card__image">
                                            <img src={p.image} alt={p.name} loading="lazy" />
                                            {p.originalPrice > p.price && (
                                                <div className="discount-badge">
                                                    {Math.round((1 - p.price / p.originalPrice) * 100)}% OFF
                                                </div>
                                            )}
                                        </Link>
                                        <div className="product-card__content">
                                            <div className="product-card__brand">{p.brand}</div>
                                            <Link to={`/products/${p.id}`} className="product-card__title">
                                                {p.name}
                                            </Link>
                                            
                                            <div className="product-card__rating">
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

                                            <div className="product-card__price-row-v2">
                                                <div className="price-main">
                                                    <span className="currency-symbol">₹</span>
                                                    <span className="price-value">{p.price.toLocaleString()}</span>
                                                </div>
                                                {p.originalPrice > p.price && (
                                                    <div className="price-mrp">
                                                        M.R.P: <span>₹{p.originalPrice.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="product-card__stock-info">
                                                {p.stock === 'In Stock' ? (
                                                    <span className="stock-status in-stock">In Stock</span>
                                                ) : (
                                                    <span className="stock-status limited-stock">{p.stock}</span>
                                                )}
                                                <div className="delivery-info">Free Delivery by SecureVision</div>
                                            </div>

                                            <div className="product-card__footer">
                                                <Link to={`/products/${p.id}`} className="btn-view-details">
                                                    <FiEye /> View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
            {showMobileFilters && <div className="sidebar-overlay" onClick={() => setShowMobileFilters(false)}></div>}
        </div>
    )
}
