import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookView.css';
import BookList from './../Views/BookList';

function BookView() {
    const [books, setBooks] = useState([]);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        //Fetch data from backend
        const fetchData = async () => {
            try {
                //if searchString present, set is as 'searchString' in params for backend purposes
                const params = searchString ? { searchString: searchString } : {};
                const response = await axios.get('http://127.0.0.1:8000/booklists/', {params}); //Need to change to booklists/${libraryID}/ once info available globally
                setBooks(response.data);
            } catch (e) {
                console.error('Error fetching data: ', e);
            }
        };

        fetchData();
    }, [searchString]);
  return (
    <div className="BookView">
        <div className='searchbar'>
              <form className='searchform' onSubmit={(e) => e.preventDefault()}>
                  <input className='inputbar' type='text' value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search for a book by author or title" />
                <button className='barbutton' type='submit'>Search</button>
            </form>
            <hr />
        </div>
        <div className='booksView'>
            <BookList books={books} />
        </div>
    </div>
  );
}

export default BookView;