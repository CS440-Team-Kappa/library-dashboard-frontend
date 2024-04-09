import React from 'react';

const BookElement = ({ title, author, availableCopies, bookID }) => {
    const redirectToDetailsPage = () => {
        //Redirect to book-specific info page using bookID
        window.location.href = `/books/${bookID}`;
    };

    return (
        <tr className="book-element" onClick={redirectToDetailsPage}>
            <td>{title}</td>
            <td>{author}</td>
            <td>{availableCopies}</td>
        </tr>
    );
};

export default BookElement;