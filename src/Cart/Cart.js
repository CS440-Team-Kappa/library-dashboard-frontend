import React, { useState, useEffect } from 'react'
import BookList from "../Views/BookList";
import "./Cart.css";
import UserProfile from "../Components/UserProfile";
import CartInfo from "./CartInfo";
import axios from 'axios';
import CartTable from './../Views/Table'

function Cart({}) {

    const checkOutCart = async() => {
        try {
            const params = new URLSearchParams();
            params.append('MemberID', UserProfile.getMemberID());
            selectedCopyIDs.forEach(id => params.append('BookID', id));
            //const checkOutResponse = await axios.get(`http://127.0.0.1:8000/checkout-book/?${params.toString()}`);
            clearCart();
        } catch (e) {
            console.error('Failed to check out books: ', e)
        }
    }

    const clearCart = () => {
        setSelectedCopyIDs([]);
    }

    const [selectedCopyIDs, setSelectedCopyIDs] = useState(CartInfo.getSelectedBookCopies());
    const [selectedCopyInfo, setSelectedCopyInfo] = useState([]);


    //update Cart when CartInfo changes
    useEffect(() => {
        const updateSelectedCopyIDs = (selectedCopyIDs) => {
            setSelectedCopyIDs(selectedCopyIDs);
        };

        CartInfo.setUpdateElementFcn(updateSelectedCopyIDs);
    }, []);

    //Fetch book copy option data from backend
    useEffect(() => {
        const fetchCopyInfo = async () => {
            try {
                const params = new URLSearchParams();
                selectedCopyIDs.forEach(id => params.append('BookCopyID', id));
                const response = await axios.get(`http://127.0.0.1:8000/bookcopies/?${params.toString()}`);
                const copies = response.data.map(copy => ({
                    id: copy.BookCopyID,
                    values: [copy.LibraryName, copy.Title, copy.BookCondition]
                }));
                setSelectedCopyInfo(copies);
            } catch (e) {
                console.log('Error fetching copy information: ', e);
            }
        };

        fetchCopyInfo();
    }, [selectedCopyIDs]);


    let cart;
    if (!UserProfile.isLoggedIn()) {
        cart = <h2 className="loginAlert">Please log in to check out books!</h2>
    } else {
        cart =  (<div>
                    <div className="CartActions">
                        <button className="cartButtons" onClick={checkOutCart}>Check Out</button>
                        <button className="cartButtons" onClick={clearCart}>Clear Cart</button>
                    </div>
                    <div className="BookCartView">
                <CartTable headers={['Library', 'Title', 'Condition']} data={selectedCopyInfo} onRowClick={(copyID) => CartInfo.updateSelectedBookCopies(copyID)}/>
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
