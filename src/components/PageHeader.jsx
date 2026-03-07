import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
    return (
        <div style={{
            background: '#4682B4',
            padding: '40px 0',
            color: '#ffffff',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', textAlign: 'center' }}>
                    {/* Breadcrumbs removed as per user request */}
                    <h1 style={{ color: '#ffffff', margin: 0, fontSize: '2.5rem' }}>{title}</h1>
                    {subtitle && <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0, fontSize: '1.1rem', maxWidth: '800px' }}>{subtitle}</p>}
                </div>
            </div>
        </div>
    )
}
