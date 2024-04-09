import './BookView.css';

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

            </div>
        </div>
    </div>
  );
}

export default BookView;