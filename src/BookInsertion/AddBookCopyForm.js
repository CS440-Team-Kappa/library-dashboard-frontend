import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropDownFilterList from './DropDownFilterList';

const AddBookCopyForm = () => {

    //Track input info
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const [authors, setAuthors] = useState(['']);
    const [genreOptions, setGenreOptions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [books, setBooks] = useState([]);

    //Fetch genre option data from backend
    useEffect(() => {
        const fetchGenreOptions = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/genres/`);
                const genrOptions = response.data.map(genre => ({
                    id: genre.GenreID,
                    label: genre.GenreName
                }));
                setGenreOptions(genrOptions);
            } catch (e) {
                console.log('Error fetching genre options: ', e);
            }
        };

        fetchGenreOptions();
    }, []);

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

    const handleSelectedGenres = (genres) => {
        setSelectedGenres(genres);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('LibraryID', '0'); // Assuming you want to hardcode the library ID for now
        params.append('Title', title);
        params.append('Description', description);
        authors.forEach(author => {
            const { firstName, lastName } = parseAuthorName(author);
            params.append('AuthorFirstName', firstName);
            params.append('AuthorLastName', lastName);
        });
        selectedGenres.forEach(id => params.append('GenreID', id));
        try {
            await axios.post(`http://127.0.0.1:8000/books/?${params.toString()}`);
            // Reset form fields
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
                    Title
                    <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label className="Label">
                    ISBN:
                    <input required type="text" value={isbn} onChange={(e) => setISBN(e.target.value)} />
                </label>
                <br />
                <label className="Label">
                    Description:
                    <textarea required value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <label className="Label">
                    Authors:
                    {authors.map((author, index) => (
                        <input required
                            key={index}
                            type="text"
                            value={author}
                            onChange={(e) => handleAuthorChange(index, e.target.value)}
                        />
                    ))}
                    <button type="button" onClick={addAuthorField}>Add Author</button>
                </label>
                <label className="Label">
                    <DropDownFilterList filterOptions={genreOptions} handleOptionUpdate={handleSelectedGenres} buttonText="Genres" />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddBookCopyForm;