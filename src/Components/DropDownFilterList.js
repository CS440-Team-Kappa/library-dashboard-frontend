import React, { useState } from 'react';
import './CSS/DropDownFilterList.css';

const DropDownFilterList = ({ filterOptions, handleOptionUpdate }) => {
    //Track whether drop-down list is open
    const [isOpen, setIsOpen] = useState(false);

    //Track and update currently selected options
    const [selectedOptions, setSelectedOptions] = useState([]);

    //Update selected options to add/remove and pass data to parent element
    const handleOptionToggle = (optionID) => {
        const isSelected = selectedOptions.includes(optionID);
        if (isSelected) {
            setSelectedOptions(selectedOptions.filter(id => id !== optionID));
        }
        else {
            setSelectedOptions([...selectedOptions, optionID]);
        }
        handleOptionUpdate(selectedOptions);
    }
    return (
        <div className="DropDownFilterList">
            <button className="DropDownButton" onClick={() => setIsOpen(!isOpen)}>Libraries</button>
            {isOpen && (
                <div className="DropDownContent">
                    {filterOptions.map(option => (
                        <div key={option.id}>
                            <input type="checkbox" id={option.id} checked={selectedOptions.includes(option.id)} onChange={() => handleOptionToggle(option.id)} />
                            <label htmlFor={option.id}>{option.label}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDownFilterList;