import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Modal from './Modal';
import CartInfo from './../Cart/CartInfo'
import UserProfile from './../Components/UserProfile';

const BookList = ({ books, selectedLibraries, fetchFcn }) => {
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

    // Function to fetch book copy details
    const fetchBookCopyDetails = async (bookId) => {
        try {
            const params = new URLSearchParams();
            params.append('BookID', bookId);
            selectedLibraries.forEach(id => params.append('LibraryID', id));
            const bookCopyDetailsResponse = await axios.get(`http://127.0.0.1:8000/bookcopydetail/?${params.toString()}`);
            setBookCopyDetails(bookCopyDetailsResponse.data);
        } catch (e) {
            console.error('Failed to fetch book copy details: ', e);
        }
    };

    //Delete Book Copy for employees
    const handleDelete = async (copyID) => {
        try {
            const params = new URLSearchParams();
            params.append('BookCopyID', copyID);
            const deleteBookCopyResponse = await axios.get(`http://127.0.0.1:8000/deletebookcopy/?${params.toString()}`);

            //Update book copy details after deletion
            await fetchBookCopyDetails(bookDetails.BookID);
            await fetchFcn();
        } catch (e) {
            console.log('Error deleting book copy: ', e);
        }
    };

    //Open modal containing book and book copy details
    const handleRowClick = async (bookId) => {
        try {
            //Get book details
            const params1 = new URLSearchParams();
            params1.append('BookID', bookId);
            const bookDetailsResponse = await axios.get(`http://127.0.0.1:8000/bookdetail/?${params1.toString()}`);
            setBookDetails(bookDetailsResponse.data);

            //Get book copy details
            await fetchBookCopyDetails(bookId);
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
                        <p class="ModalText">Description: {bookDetails.Description}</p>
                        {bookCopyDetails && (
                            <Table
                                headers={UserProfile.isEmployee() ? ['Library', 'Book Copy ID', 'Condition', 'Available', 'Delete'] : ['Library', 'Book Copy ID', 'Condition', 'Available']}
                                data={bookCopyDetails.map(copy => ({
                                    id: copy.BookCopyID, //Row ID
                                    values: UserProfile.isEmployee() ? [copy.LibraryName, copy.BookCopyID, copy.BookCondition, copy.CheckedOut, <button onMouseDown={(e) => {e.stopPropagation(); handleDelete(copy.BookCopyID)}}>Delete</button>] : [copy.LibraryName, copy.BookCopyID, copy.BookCondition, copy.CheckedOut] //Row data
                                }))}
                                onRowClick={(copyID) => {
                                        CartInfo.updateSelectedBookCopies(copyID)}
                                }
                            />
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default BookList;