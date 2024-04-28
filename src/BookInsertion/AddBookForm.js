import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = () => {

    //Track input info
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const [authors, setAuthors] = useState(['']);

    const parseAuthorName = (fullName) => {
        // Split the full name into parts
        const parts = fullName.split(' ');

        let firstName = parts[0];
        let middleName = '';
        let lastName = '';

        //Check for first and last name
        if (parts.length > 1) {
            //Last element is last name
            lastName = parts.pop();

            if (parts.length > 1) {
                middleName = parts.slice(1).join(' ');
            }
        }

        return { firstName, middleName, lastName };
    };

    const handleAuthorChange = (index, value) => {
        const updatedAuthors = [...authors];
        updatedAuthors[index] = value;
        setAuthors(updatedAuthors);
    };

    const addAuthorField = () => {
        setAuthors([...authors, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('ISBN', isbn);
        params.append('Title', title);
        params.append('Description', description);
        authors.forEach(author => {
            const { firstName, middleName, lastName } = parseAuthorName(author);
            params.append('AuthorFirstName', firstName);
            params.append('AuthorMiddleName', middleName);
            params.append('AuthorLastName', lastName);
        });
        axios.post(`http://127.0.0.1:8000/books/?${params.toString()}`);

        //Reset form fields
        setTitle('');
        setISBN('');
        setDescription('');
        setAuthors(['']);
    }

    return (
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
            <br />
            <button type="submit">Submit</button>
        </form>
    );

};

export default AddBookForm;