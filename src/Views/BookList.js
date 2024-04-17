import React, { useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Modal from './Modal';

const BookList = ({ books }) => {
    //Table Headers
    const headers = ['Title', 'Author', 'Available Copies'];

    //Convert book objects into JSON data for Table
    const data = books.map(book => ({
        id: book.BookID, //Row ID
        values: [book.Title, book.Authors, book.CopiesAvailable] //Row data
    }));

    const [isModalOpen, setModalOpen] = useState(false);
    const [bookDetails, setBookDetails] = useState({});

    //Open modal or route to book details page
    const handleRowClick = async (bookId) => {
        console.log("Book ID clicked: ", bookId);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/books/${bookId}/`);
            setBookDetails(response.data);
            setModalOpen(true);
        } catch (e) {
            console.error('Failed to fetch book details: ', e);
        }
    };

    return (
        <div className="book-list">
            <Table headers={headers} data={data} onRowClick={handleRowClick} />
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div>
                    <h1>{bookDetails.title || 'Book Details'}</h1>
                    <p>Author: {bookDetails.author}</p>
                    <p>Available Copies: {bookDetails.availableCopies}</p>
                </div>
            </Modal>
        </div>
    );
};

export default BookList;