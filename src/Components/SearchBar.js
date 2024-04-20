import React from 'react';

const SearchBar = ({ searchString, setSearchString }) => {
    return (
        <div className='searchbar'>
            <form className='searchform' onSubmit={(e) => e.preventDefault()}>
                <input className='inputbar' type='text' value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search for a book by author or title" />
                <button className='barbutton' type='submit'>Search</button>
            </form>
            <hr />
        </div>
    );
};

export default SearchBar;