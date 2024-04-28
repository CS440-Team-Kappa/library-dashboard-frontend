import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBookCopyForm = () => {

    //Track input info
    const [bookCondition, setBookCondition] = useState('');
    // Maybe don't track this stuff
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const [authors, setAuthors] = useState(['']);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/book/?LibraryID=0');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const parseAuthorName = (fullName) => {
        // Split the full name into parts
        const parts = fullName.split(' ');

        let firstName = parts[0];
        let lastName = parts[1];

        return { firstName, lastName };
    };

    const handleAuthorChange = (index, value) => {
        const updatedAuthors = [...authors];
        updatedAuthors[index] = value;
        setAuthors(updatedAuthors);
    };

    const addAuthorField = () => {
        setAuthors([...authors, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('BookCondition', bookCondition);
        params.append('Title', title);
        params.append('Description', description);
        authors.forEach(author => {
            const { firstName, lastName } = parseAuthorName(author);
            params.append('AuthorFirstName', firstName);
            params.append('AuthorLastName', lastName);
        });
        try {
            await axios.post(`http://127.0.0.1:8000/books/?${params.toString()}`);
            // Reset form fields
            setBookCondition('');
            setTitle('');
            setISBN('');
            setDescription('');
            setAuthors(['']);
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    return (
        <div>
            <h2>Books in Library</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>ISBN</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.BookID}>
                            <td>{book.Title}</td>
                            <td>{book.ISBN}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <label className="Label">
                    Book Condition
                    <textarea required value={bookCondition} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddBookCopyForm;