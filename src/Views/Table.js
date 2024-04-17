import React from 'react';

const Table = ({ headers, data, onRowClick }) => {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id} onClick={() => onRowClick(item.id)} style={{ cursor: 'pointer' }}>
                        {item.values.map((cell, index) => (
                            <td key={index}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
