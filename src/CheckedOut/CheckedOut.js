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
  
    
        
        return (
            <div className="CheckedOut">  
                <h2 className="title">Checked Out Books</h2>
                 {mbcBooks.map (mbc => (
                    <table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Check-out Date</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr key={mbcBooks.BookCopyID}>
                                    <td>{mbc.Title}</td>
                                    <td>{JSON.stringify(mbc.OutDate).substring(1,11)}</td>
                                    <td>{JSON.stringify(mbc.DueDate).substring(1,11)}</td>
                                </tr>
                        </tbody>
                    </table>
                   ))}
            </div>
        )
}
export default CheckedOut;