import { FiX } from 'react-icons/fi'
import './VideoModal.css'

export default function VideoModal({ videoSrc, onClose }) {
    return (
        <div className="video-modal-overlay" onClick={onClose}>
            <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                <button className="video-close-btn" onClick={onClose} aria-label="Close video">
                    <FiX size={24} />
                </button>
                <div className="video-container">
                    <video
                        src={videoSrc}
                        controls
                        autoPlay
                        className="demo-video"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    )
}
