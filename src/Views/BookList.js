import React, { useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Modal from './Modal';
import CartInfo from './../Cart/CartInfo'

const BookList = ({ books, selectedLibraries }) => {
    //Table Headers
    const headers = ['Title', 'Author', 'Available Copies'];

    //Convert book objects into JSON data for Table
    const data = books.map(book => ({
        id: book.BookID, //Row ID
        values: [book.Title, book.Authors, book.CopiesAvailable] //Row data
    }));

    const [isModalOpen, setModalOpen] = useState(false);
    const [bookDetails, setBookDetails] = useState({});
    const [bookCopyDetails, setBookCopyDetails] = useState([]);

    //Open modal containing book and book copy details
    const handleRowClick = async (bookId) => {
        try {
            //Get book details
            const bookDetailsResponse = await axios.get(`http://127.0.0.1:8000/bookdetail/${bookId}/`);

            //Set selected Library IDs as LibraryID (list) and BookID for parameters for book copy details fetching
            const params = new URLSearchParams();
            params.append('BookID', bookId);
            selectedLibraries.forEach(id => params.append('LibraryID', id));
            const bookCopyDetailsResponse = await axios.get(`http://127.0.0.1:8000/bookcopydetail/?${params.toString()}`);
            setBookDetails(bookDetailsResponse.data);
            setBookCopyDetails(bookCopyDetailsResponse.data);
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
                        <h1 class="ModalTitle">{bookDetails.Title || 'Book Details'}</h1>
                        <p class="ModalText">Author: {bookDetails.Authors}</p>
                        <p class="ModalText">ISBN: {bookDetails.ISBN}</p>
                        {bookCopyDetails && (
                            <Table
                                headers={['Library', 'Book Copy ID', 'Condition', 'Available']}
                                data={bookCopyDetails.map(copy => ({
                                    id: copy.BookCopyID, //Row ID
                                    values: [copy.LibraryName, copy.BookCopyID, copy.BookCondition, copy.CheckedOut] //Row data
                                }))}
                                onRowClick={(copyID) => CartInfo.updateSelectedBookCopies(copyID)}
                            />
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default BookList;