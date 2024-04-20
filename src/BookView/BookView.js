import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookView.css';
import BookList from './../Views/BookList';
import SearchBar from './../Components/SearchBar';
import DropDownFilterList from './../Components/DropDownFilterList';

function BookView() {
    const [books, setBooks] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [selectedLibraries, setSelectedLibraries] = useState([]); //Need to auto select user's home library if available and propagate changes to DropDownFilterList
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
                const libraryIDs = selectedLibraries.join(',');
                console.log("Selected libraries: " + libraryIDs);
                //Set selected Library IDs as LibraryID (list) for parameters
                const params = { LibraryID: libraryIDs };
                const response = await axios.get(`http://127.0.0.1:8000/booklistsagg/`, {params}); 
                setBooks(response.data);
            } catch (e) {
                console.error('Error fetching books: ', e);
            }
        };

        fetchBooks();
    }, [searchString, selectedLibraries]);

  //Handle adding/removing libraries
    const handleSelectedLibraries = (libraries) => {
        setSelectedLibraries(libraries);
    }

    const filteredBooks = books.filter(book =>
        book.Title.toLowerCase().includes(searchString.toLowerCase()) || book.Authors.toLowerCase().includes(searchString.toLowerCase())
    );

  return (
      <div className="BookView">
          <SearchBar searchString={searchString} setSearchString={setSearchString} />
          <DropDownFilterList filterOptions={libraryOptions} handleOptionUpdate={handleSelectedLibraries} />
          <div className='booksView'>
              <BookList books={filteredBooks} />
          </div>
    </div>
  );
}

export default BookView;