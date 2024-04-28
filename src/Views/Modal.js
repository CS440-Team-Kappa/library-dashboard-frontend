import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="ModalOverlay">
            <div className="ModalContent">
                <div className="CloseBtn" onClick={onClose}></div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
