import React from 'react';
import './Modal.css'; // Asegúrate de crear este archivo CSS para estilizar tu modal

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
                <button className="close-button" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;
