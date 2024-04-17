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

    //Open modal containing book details
    const handleRowClick = async (bookId) => {
        console.log("Book ID clicked: ", bookId);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/bookdetails/${bookId}/`);
            setBookDetails(response.data[0]);
            setModalOpen(true);
        } catch (e) {
            console.error('Failed to fetch book details: ', e);
        }
    };

    return (
        <div className="bookList">
            <Table headers={headers} data={data} onRowClick={handleRowClick} />
            {bookDetails && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <div>
                        <h1>{bookDetails.Title || 'Book Details'}</h1>
                        <p>Author: {bookDetails.Authors}</p>
                        <p>ISBN: {bookDetails.ISBN}</p>
                        {bookDetails.Copies && (
                            <Table
                                headers={['Library ID', 'Book Copy ID', 'Condition', 'Available']}
                                data={bookDetails.Copies.map(copy => ({
                                    id: copy.BookCopyID, //Row ID
                                    values: [copy.LibraryID, copy.BookCopyID, copy.BookCondition, copy.CheckedOut] //Row data
                                }))}
                                onRowClick={() => { }} //Clicking bookCopy row currently does nothing
                            />
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default BookList;