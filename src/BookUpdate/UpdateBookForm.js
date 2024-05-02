import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropDownFilterList from './../Components/DropDownFilterList';
import TitleInputSearch from './../BookInsertion/TitleInputSearch';
import './UpdateBookForm.css';
import UserProfile from './../Components/UserProfile';

const UpdateBookForm = () => {

    //Track input info
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const parseAuthorName = (fullName) => {
        // Split the full name into parts
        const parts = fullName.split(' ');

        let firstName = parts[0];
        let lastName = parts[1];

        return { firstName, lastName };
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('ISBN', isbn);
        params.append('Title', title);
        params.append('Description', description);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/updatebook/?${params.toString()}`);
            const resultData = response.data
            if (resultData) {
                setResponseMessage('Book updated successfully.');
            } else {
                setResponseMessage(response.data.ResponseMessage);
            }

            //Clear input fields
            setTitle('');
            setISBN('');
            setDescription('');
        }
        catch (error) {
            setResponseMessage('Error updating book.')
        }

        setTimeout(() => setResponseMessage(''), 3000);
    }

    const handleSearchSelect = (suggestedBook) => {
        setTitle(suggestedBook.label);
        setISBN(suggestedBook.isbn);
        setDescription(suggestedBook.description);
    }


    return (
        <>
            {
                responseMessage ? (
                    <div className="ResponseMessage" > {responseMessage} </div>
                ) : (
                    <form className="UpdateForm" onSubmit={handleSubmit}>
                        <label className="Label">
                            Title
                            <TitleInputSearch value={title} onChange={(e) => setTitle(e.target.value)} handleClick={(e) => handleSearchSelect(e)} />
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
                        <button type="submit" className="update-btn">Update</button>
                    </form>
                )}
        </>);

};

export default UpdateBookForm;