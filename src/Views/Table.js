import React, { useState } from 'react';
import './Table.css';

const Table = ({ headers, data, onRowClick }) => {

    //States to hold current page number and page row count
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //Calculate number of pages for given data
    const pageCount = Math.ceil(data.length / rowsPerPage);

    //Grab data based on current page
    const currentPageData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    console.log(data)

    return (
        <>
        <div className="tableContainer">
        <table className="table">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th className="th" key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {currentPageData.map(item => (
                    <tr key={item.id} onClick={() => onRowClick(item.id)} style={{ cursor: 'pointer' }}>
                        {item.values.map((cell, index) => (
                            <td className="td" key={index}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        <div className="pagination">
            <button className="button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 0}> Previous </button>
            <span className="pageInfo"> Page {currentPage + 1} of {pageCount} </span>
            <button className="button" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount - 1}> Next </button>
        </div>
        </>
    );
};

export default Table;
