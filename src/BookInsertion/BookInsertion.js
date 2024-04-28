import React, { useState } from 'react';
import Modal from '../Views/Modal';
import axios from 'axios';
import UserProfile from './../Components/UserProfile';
import AddBookForm from './AddBookForm';
import AddBookCopyForm from './AddBookCopyForm'


const BookInsertion = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('addBook');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedOption('addBook');
    }

    return (
        <div className="BookInsertion">
            <button onClick={() => setModalOpen(true)}>Add Book</button>
            {UserProfile.isEmployee() && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                    <div>
                        <div className="OptionBar">
                            <button onClick={() => handleOptionClick('addBook')}>Add Book</button>
                            <button onClick={() => handleOptionClick('addBookCopy')}>Add Book Copy</button>
                        </div>
                        <div className="ModalMainContent">
                            {selectedOption === 'addBook' && (
                                <div>
                                    <AddBookForm />
                                </div>
                            )}
                            {selectedOption === 'addBookCopy' && (
                                <div>
                                    <AddBookCopyForm />
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default BookInsertion;