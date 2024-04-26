import BookList from "../Views/BookList";
import "./Cart.css";

function Cart() {
    const dummyBooks = [
        { BookID: 1, title: "Book 1", author: "Author 1", availableCopies: 5 },
        { BookID: 2, title: "Book 2", author: "Author 2", availableCopies: 3 },
        { BookID: 3, title: "Book 3", author: "Author 3", availableCopies: 7 }
    ];
    
    return (
        <div className="Cart">
            <div className="CartActions">
                <button className="cartButtons">Check Out</button>
                <button className="cartButtons">Clear Cart</button>
            </div>
            <div className="BookCartView">
                <BookList books={dummyBooks} />
            </div>
        </div>
    )
}

export default Cart;