import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from "../Views/BookList";
import "./CheckedOut.css"
import UserProfile from "../Components/UserProfile";
import Table from '../Views/Table';
import CartInfo from '../Cart/CartInfo';

function CheckedOut() {
    const [mbcBooks, setMbcBooks] = useState([]);

    useEffect(() => {
        const fetchMbcBooks = async () => {
            try {
                const params = new URLSearchParams();
                params.append('MemberID', UserProfile.getMemberID());
                const response = await axios.get(`http://127.0.0.1:8000/memberbookcopies/?${params.toString()}`);
                setMbcBooks(response.data);
            } catch (e) {
            console.log('Error fetching book options: ', e);
            }
        };

        fetchMbcBooks();
    }, []);

    //Checks-in a book by removing the corresponding entry in the MemberBookCopy Table
    const handleCheckIn = async (bcID) => {
        try {
            const params = new URLSearchParams();
            params.append('BCID', bcID);
            params.append('MID', UserProfile.getMemberID());
            console.log('member id: ' + UserProfile.getMemberID());
            await axios.get(`http://127.0.0.1:8000/removembc/?${params.toString()}`);
            setMbcBooks(mbcBooks.filter(mbc => mbc.BookCopyID !== bcID));
        } catch (e) {
            console.log('Error checking in book: ', e);
        }
    }
  
 
    if (!UserProfile.isLoggedIn()) {  
        return (<div className="CheckedOut"><h2 className='loginAlert'>Log in to view checked out books!</h2></div>)
    } else {
        return (
            <div className="CheckedOut">  
                <h2 className="title">Checked Out Books</h2>
                 {mbcBooks.map (mbc => (
                    <table>
                        <thead>
                            <tr>
                                <th className="fontSizeHead">Book Title</th>
                                <th className="fontSizeHead">Check-out Date</th>
                                <th className="fontSizeHead">Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr key={mbcBooks.BookCopyID}>
                                    <td className="fontSizeTitle">{mbc.Title}</td>
                                    <td  className="fontSize">{JSON.stringify(mbc.OutDate).substring(1,11)}</td>
                                    <td  className="fontSize">{JSON.stringify(mbc.DueDate).substring(1,11)}</td>
                                 <button className="checkInButton" onClick={() => handleCheckIn(mbc.BookCopyID)}>Check-In</button>
                                </tr>
                        </tbody>
                    </table>
                   ))}
            </div>
        )
    }
}
export default CheckedOut;