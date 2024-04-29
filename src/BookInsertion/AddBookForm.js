import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropDownFilterList from '../Components/DropDownFilterList';
import './AddBookForm.css';

const AddBookForm = ({ LibraryID }) => {

    //Track input info
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const [authors, setAuthors] = useState(['']);
    const [genreOptions, setGenreOptions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    // Added book conditions field
    const [bookCondition, setBookCondition] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

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
        params.append('ISBN', isbn);
        params.append('Title', title);
        params.append('Description', description);
        // Added book condition param
        params.append('Book Condition', bookCondition);

        authors.forEach(author => {
            const { firstName, lastName } = parseAuthorName(author);
            params.append('AuthorFirstName', firstName);
            params.append('AuthorLastName', lastName);
        });
        selectedGenres.forEach(id => params.append('GenreID', id));
        try {
            const response = await axios.get(`http://127.0.0.1:8000/book/?${params.toString()}`);
            const bookExists = response.data.BookExists;
            // Check if book exists
            if (bookExists) {
                // Grab IDs
                const bookID = response.data.BookID;
                // Pass first LibraryID (don't know if it gets it from UserProfile)
                const libraryID = LibraryID[0];
                // Make a copy using bookID and libraryID
                // Example: await axios.post('http://127.0.0.1:8000/book/copy/', { BookID: bookID, LibraryID: libraryID });
                setResponseMessage('Book copied successfully.');
            } else {
                setResponseMessage(response.data.ResponseMessage);
            }

            //Clear input fields
            setTitle('');
            setISBN('');
            setDescription('');
            setAuthors(['']);
            setBookCondition('');
        }
        catch (error) {
            setResponseMessage('Error adding book.')
        }

        setTimeout(() => setResponseMessage(''), 3000);
    }

    return (
        <>
            {
                responseMessage ? (
                    <div className="ResponseMessage" > {responseMessage} </div>
                ) : (
                    <form className="AddForm" onSubmit={handleSubmit}>
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
                            Book Condition:
                            <input required type="text" value={bookCondition} onChange={(e) => setBookCondition(e.target.value)} />
                        </label>
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
                        <DropDownFilterList filterOptions={genreOptions} handleOptionUpdate={handleSelectedGenres} buttonText={"Genres"} />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                )}
        </>);

};

export default AddBookForm;