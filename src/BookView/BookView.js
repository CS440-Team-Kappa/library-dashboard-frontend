import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookView.css';
import BookList from './../Views/BookList';

function BookView() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        //Fetch data from backend
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/booklists/');
                setBooks(response.data);
            } catch (e) {
                console.error('Error fetching data: ', e);
            }
        };

        fetchData();
    }, []);
  return (
    <div className="BookView">
        <div className='searchbar'>
            <form className='searchform'>
                <input className='inputbar' type='text'></input>
                <button className='barbutton' type='submit'>Search</button>
            </form>
            <hr />
            <div className='booksView'>
                <BookList books={books} />
            </div>
        </div>
    </div>
  );
}

export default BookView;