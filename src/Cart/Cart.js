import React, { useState, useEffect } from 'react'
import BookList from "../Views/BookList";
import "./Cart.css";
import UserProfile from "../Components/UserProfile";
import CartInfo from "./CartInfo";
import axios from 'axios';

function Cart({selectedBookCopies}) {

    const selectedCopyIDs = CartInfo.getSelectedBookCopies();
    const [selectedCopyInfo, setSelectedCopyInfo] = useState([]);

    //Fetch book copy option data from backend
    useEffect(() => {
        const fetchCopyInfo = async () => {
            try {
                const params = new URLSearchParams();
                selectedCopyIDs.forEach(id => params.append('BookCopyID', id));
                const response = await axios.get(`http://127.0.0.1:8000/bookcopydetail/?${params.toString()}`);
                const copies = response.data.map(library => ({
                    id: copies.BookCopyID,
                    label: library.LibraryName
                }));
                setSelectedCopyInfo(copies);
            } catch (e) {
                console.log('Error fetching library options: ', e);
            }
        };

        fetchCopyInfo();
    }, []);

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