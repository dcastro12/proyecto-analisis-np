import React from 'react';
import './Modal.css'; // Asegúrate de crear este archivo CSS para estilizar tu modal
import { Button } from 'react-bootstrap';

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
                <Button className="close-button btn-danger" onClick={onClose}>Cerrar</Button>
            </div>
        </div>
    );
};

export default Modal;
