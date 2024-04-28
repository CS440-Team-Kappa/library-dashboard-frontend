import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from "../Views/BookList";
import "./CheckedOut.css"
import UserProfile from "../Components/UserProfile";
import Table from '../Views/Table';

function CheckedOut() {
    const [mbcBooks,setMbcBooks]= useState([]);
    useEffect(() => {
        const fetchMbcBooks = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/memberbookcopies/`);
                setMbcBooks(response.data);
            } catch (e) {
            console.log('Error fetching book options: ', e);
            }
        };

        fetchMbcBooks();
    }, []);
  
 
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
                                <th class="fontSizeHead">Book Title</th>
                                <th class="fontSizeHead">Check-out Date</th>
                                <th class="fontSizeHead">Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr key={mbcBooks.BookCopyID}>
                                    <td class="fontSizeTitle">{mbc.Title}</td>
                                    <td  class="fontSize">{JSON.stringify(mbc.OutDate).substring(1,11)}</td>
                                    <td  class="fontSize">{JSON.stringify(mbc.DueDate).substring(1,11)}</td>
                                </tr>
                        </tbody>
                    </table>
                   ))}
            </div>
        )
    }
}
export default CheckedOut;