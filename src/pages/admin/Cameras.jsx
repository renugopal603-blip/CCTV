import { useState } from 'react'
import { FiVideo, FiEdit, FiTrash2, FiMaximize2, FiMapPin, FiActivity, FiCamera } from 'react-icons/fi'
import { useRef } from 'react'

export default function Cameras() {
    const [cameras, setCameras] = useState([
        { id: 1, name: 'Front Entrance 4K', location: 'Main Gate', status: 'Online', ip: '192.168.1.101', resolution: '4K', image: null },
        { id: 2, name: 'North Parking PTZ', location: 'Section B', status: 'Online', ip: '192.168.1.102', resolution: '1080p', image: null },
        { id: 3, name: 'Elevator Lobby 3', location: 'Floor 3', status: 'Offline', ip: '192.168.1.105', resolution: '2K', image: null },
        { id: 4, name: 'Back Store Exit', location: 'Loading Dock', status: 'Online', ip: '192.168.1.108', resolution: '1080p', image: null },
    ])

    const fileInputRef = useRef(null)
    const [selectedCam, setSelectedCam] = useState(null)

    const handlePhotoTrigger = (camId) => {
        setSelectedCam(camId)
        fileInputRef.current.click()
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file && selectedCam) {
            const imageUrl = URL.createObjectURL(file)
            setCameras(prev => prev.map(cam =>
                cam.id === selectedCam ? { ...cam, image: imageUrl } : cam
            ))
        }
    }

    return (
        <div className="admin-cameras">
            <div className="admin-card-large">
                <div className="card-header">
                    <h3>CCTV Camera Inventory</h3>
                    <button className="admin-login-btn" style={{ width: 'auto', height: 40, padding: '0 20px', fontSize: '0.85rem' }}>+ Add New Camera</button>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Camera Details</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>IP Address</th>
                                <th>Live Preview</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cameras.map(cam => (
                                <tr key={cam.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div className="camera-thumb-container">
                                                {cam.image ? (
                                                    <img src={cam.image} alt={cam.name} className="camera-thumb-img" />
                                                ) : (
                                                    <div className="camera-thumb-placeholder">
                                                        {cam.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                )}
                                                <button
                                                    className="photo-edit-overlay"
                                                    onClick={() => handlePhotoTrigger(cam.id)}
                                                    title="Change Photo"
                                                >
                                                    <FiCamera size={12} />
                                                </button>
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{cam.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{cam.resolution} Resolution</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: '0.85rem' }}>
                                            <FiMapPin size={14} />
                                            {cam.location}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${cam.status.toLowerCase()}`}>
                                            {cam.status}
                                        </span>
                                    </td>
                                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#64748b' }}>
                                        {cam.ip}
                                    </td>
                                    <td>
                                        <div className="camera-preview-sm">
                                            <FiActivity size={18} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="action-btn" title="View Stream"><FiMaximize2 size={14} /></button>
                                            <button className="action-btn" title="Edit Config"><FiEdit size={14} /></button>
                                            <button className="action-btn delete" title="Decommission"><FiTrash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handlePhotoChange}
                />
            </div>
        </div>
    )
}
