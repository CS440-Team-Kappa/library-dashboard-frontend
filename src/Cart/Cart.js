import BookList from "../Views/BookList";
import "./Cart.css";
import UserProfile from "../Components/UserProfile";

function Cart({user}) {
    const dummyBooks = [
        { BookID: 1, title: "Book 1", author: "Author 1", availableCopies: 5 },
        { BookID: 2, title: "Book 2", author: "Author 2", availableCopies: 3 },
        { BookID: 3, title: "Book 3", author: "Author 3", availableCopies: 7 }
    ];

    let cart;
    if (!UserProfile.isLoggedIn()) {
        cart = <h2 className="loginAlert">Please log in to check out books!</h2>
    } else {
        cart =  (<div className="CartActions">
                    <div className="CartActions">
                        <button className="cartButtons">Check Out</button>
                        <button className="cartButtons">Clear Cart</button>
                    </div>
                    <div className="BookCartView">
                        <BookList books={dummyBooks} />
                    </div>
                </div>)
    }
    
    return (
        <div className="Cart">
            {cart}
        </div>
    )
}

export default Cart;