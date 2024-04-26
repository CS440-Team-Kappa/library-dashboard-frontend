import BookList from "../Views/BookList";
import "./CheckedOut.css"
import UserProfile from "../Components/UserProfile";

function CheckedOut({user}) {
    const dummyBooks = [
        { BookID: 1, title: "Book 1", author: "Author 1", availableCopies: 5 },
        { BookID: 2, title: "Book 2", author: "Author 2", availableCopies: 3 },
        { BookID: 3, title: "Book 3", author: "Author 3", availableCopies: 7 }
    ];

    let booklist;
    if (!UserProfile.isLoggedIn()) {
        booklist = <h3 className="loginAlert">Log in to view checked out books!</h3>
    } else {
        booklist = <BookList className='checkedOutList' books={dummyBooks}/>
    }
    
    return (
        <div className="CheckedOut">  
            <h2 className="title">Checked Out Books</h2>
            <div className="booklist">{booklist}</div>
        </div>
    )
}

export default CheckedOut;