import React, { useState } from 'react';
import Modal from '../Views/Modal';
import axios from 'axios';
import UserProfile from './../Components/UserProfile';
import UpdateBookForm from './UpdateBookForm';
import './BookUpdate.css';


const BookUpdate = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    const handleModalClose = () => {
        setModalOpen(false);
    }

    return (
        <div className="BookUpdate">
            <button onClick={() => setModalOpen(true)}>Update Book</button>
            {UserProfile.isEmployee() && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                    <div>
                        <div className="ModalMainContent">
                            <h1 className="ModalTitle">Add a Book</h1>
                            {UpdateBookForm}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default BookUpdate;