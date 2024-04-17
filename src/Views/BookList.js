import React from 'react';
import Table from './Table';
import BookElement from './BookElement';

const BookList = ({ books }) => {
    //Table Headers
    const headers = ['Title', 'Author', 'Available Copies'];

    //Convert book objects into array of data
    const data = books.map(book => [book.Title, book.Authors, book.CopiesAvailable]);

    return (
        <div className="book-list">
            <Table headers={headers} data={data} />
        </div>
    );
};

export default BookList;