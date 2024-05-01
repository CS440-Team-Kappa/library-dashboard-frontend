import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookView.css';
import BookList from './../Views/BookList';
import SearchBar from './../Components/SearchBar';
import DropDownFilterList from './../Components/DropDownFilterList';
import BookInsertion from './../BookInsertion/BookInsertion';
import UserProfile from './../Components/UserProfile';

function BookView() {
    const [books, setBooks] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [selectedLibraries, setSelectedLibraries] = useState(UserProfile.getLibraryIDs()); //Need to auto select user's home library if available and propagate changes to DropDownFilterList
    const [libraryOptions, setLibraryOptions] = useState([]); 

    //Fetch library option data from backend
    useEffect(() => {
        const fetchLibraryOptions = async () => {
            try {
                const params = new URLSearchParams();
                var endpoint = 'http://127.0.0.1:8000/libraries/'
                if (UserProfile.isLoggedIn()) {
                    UserProfile.getLibraryIDs().forEach(id => params.append('LibraryID', id));
                    endpoint += `?${params.toString()}`;
                }

                const response = await axios.get(endpoint);
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
                //Set selected Library IDs as LibraryID (list) for parameters and searchString as searchString
                const params = new URLSearchParams();
                params.append('searchString', searchString);
                selectedLibraries.forEach(id => params.append('LibraryID', id));
                const response = await axios.get(`http://127.0.0.1:8000/booklists/?${params.toString()}`);
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

  return (
      <div className="BookView">
          <SearchBar searchString={searchString} setSearchString={setSearchString} />
          {!UserProfile.isEmployee() && (
              <DropDownFilterList filterOptions={libraryOptions} handleOptionUpdate={handleSelectedLibraries} buttonText={"Library"} defaultSelection={UserProfile.getLibraryIDs()}/>
          )}
          {UserProfile.isEmployee() && (
              <BookInsertion />
          )}
          <div className='booksView'>
              <BookList books={books} selectedLibraries={selectedLibraries} />
          </div>
    </div>
  );
}

export default BookView;