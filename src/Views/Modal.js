import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: 'white', padding: '20px', zIndex: 1000,
            border: '1px solid black', borderRadius: '8px'
        }}>
            <button onClick={onClose}>Close</button>
            {children}
        </div>
    );
};

export default Modal;
