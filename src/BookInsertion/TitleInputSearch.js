import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInputSearchField from '../Components/FormInputSearchField'

const TitleInputSearch  = ({value, onChange, handleClick}) => {
	
    const [bookData, setBookData] = useState([]);

    //Fetch book autopopulation data
    const fetchBookData = useEffect(() => {
        const fetchBookData = async () => {
            try {
                const params = new URLSearchParams();
                if (value)
                    params.append('searchString', value);
                const response = await axios.get(`http://127.0.0.1:8000/bookdetail/?${params.toString()}`);
                if (response.data) {
                    const bookResponseData = response.data.map(book => ({
                        id: book.BookID,
                        label: book.Title,
                        isbn: book.ISBN,
                        description: book.Description,
                        authors: book.Authors.split(', ')
                    }));
                    setBookData(bookResponseData);
                }
                else {
                    setBookData([]);
                }
            } catch (e) {
                console.log('Error fetching genre options: ', e);
            }
        };

        fetchBookData();
    }, [value, onChange]);


    return (
        <FormInputSearchField suggestions={bookData} fieldPlaceholderText={"Enter a Title..."} value={value} onChange={onChange} handleClick={handleClick} />
    );
};

export default TitleInputSearch;