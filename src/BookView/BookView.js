import './BookView.css';
import BookList from './../Views/BookList';

//Change to fetch from backend db
const dummyBooks = [
    { BookID: 1, title: "Book 1", author: "Author 1", availableCopies: 5 },
    { BookID: 2, title: "Book 2", author: "Author 2", availableCopies: 3 },
    { BookID: 3, title: "Book 3", author: "Author 3", availableCopies: 7 }
];
function BookView() {
  return (
    <div className="BookView">
        <div className='searchbar'>
            <form className='searchform'>
                <input className='inputbar' type='text'></input>
                <button className='barbutton' type='submit'>Search</button>
            </form>
            <hr />
            <div className='booksView'>
                <BookList books={dummyBooks} />
            </div>
        </div>
    </div>
  );
}

export default BookView;