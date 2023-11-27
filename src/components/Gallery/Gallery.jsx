import React, { useState } from 'react';
import Exterior from '../../assets/gallery/exterior.png';
import Bathroom from '../../assets/gallery/bathroom.png';
import LivingRoom from '../../assets/gallery/living-room1.webp';
import LivingRoom1 from '../../assets/gallery/living-room2.png';
import Kitchen from '../../assets/gallery/kitchen.png'
import Kitchen1 from '../../assets/gallery/kitchen1.png'
import Couple from '../../assets/gallery/couple.png'
import KidsRoom from '../../assets/gallery/kids-room.png'
import KidsRoom1 from '../../assets/gallery/kids-room1.png'
import Games from '../../assets/gallery/games.png'
import Sauna from '../../assets/gallery/sauna.png'
import Study from '../../assets/gallery/study.png'
import Boat from '../../assets/gallery/boat.png'
import JetSki from '../../assets/gallery/jetski.png'
import Yacht from '../../assets/gallery/yacht.png'

export default function Gallery() {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const images = [Exterior, LivingRoom, Bathroom, LivingRoom1, Kitchen, Kitchen1, Couple, KidsRoom, KidsRoom1, Games, Sauna, Study, Boat, JetSki, Yacht];

    const openModal = (image) => {
        setCurrentImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentImage(null);
    };

    const nextImage = () => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentImage(images[nextIndex]);
    };

    const prevImage = () => {
        const currentIndex = images.indexOf(currentImage);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentImage(images[prevIndex]);
    };

    return (
        <div className="gallery-container">
            <h1 className='gallery-text'>Gallery</h1>
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Gallery item ${index}`} className="gallery-item" onClick={() => openModal(image)} />
                ))}
            </div>

            {modalOpen && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={currentImage} alt="Enlarged view" />
                    <span className="prev" onClick={prevImage}>&#10094;</span>
                    <span className="next" onClick={nextImage}>&#10095;</span>
                </div>
            )}
        </div>
    );
}
