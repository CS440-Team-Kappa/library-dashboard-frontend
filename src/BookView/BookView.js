import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookView.css';
import BookList from './../Views/BookList';
import SearchBar from './../Components/SearchBar';
import DropDownFilterList from './../Components/DropDownFilterList';

function BookView() {
    const [books, setBooks] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [selectedLibraries, setSelectedLibraries] = useState([]);
    const [libraryOptions, setLibraryOptions] = useState([]);

    //Fetch library option data from backend
    useEffect(() => {
        const fetchLibraryOptions = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/libraries/`);
                const libOptions = response.data.map(library => ({
                    id: library.LibraryID,
                    label: library.LibraryName
                }));
                setLibraryOptions(libOptions);
            } catch (e) {
            console.log('Error fetching library options: ', e);
            }
        };

        fetchLibraryOptions();
    }, []);

    //Fetch book data from backend
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                //if searchString present, set is as 'searchString' in params for backend purposes
                const params = searchString ? { searchString: searchString } : {};
                const response = await axios.get(`http://127.0.0.1:8000/booklists/`, {params}); //Need to change to booklists/${libraryID}/ once info available globally
                setBooks(response.data);
            } catch (e) {
                console.error('Error fetching books: ', e);
            }
        };

        fetchBooks();
    }, [searchString]);

  //Handle adding/removing libraries
    const handleSelectedLibraries = (libraries) => {
        setSelectedLibraries(libraries);
    }

  return (
      <div className="BookView">
          <SearchBar searchString={searchString} setSearchString={setSearchString} />
          <DropDownFilterList filterOptions={libraryOptions} handleOptionUpdate={handleSelectedLibraries} />
          <div className='booksView'>
              <BookList books={books} />
          </div>
    </div>
  );
}

export default BookView;