import React, { useState, useEffect } from 'react';
import './CSS/FormInputSearchField.css';
const FormInputSearchField = ({ suggestions, fieldPlaceholderText, value, onChange, handleClick }) => {

	const [showSuggestions, setShowSuggestions] = useState(false);

	//Show suggestions when we are active in input field
	const onInputClick = () => {
		setShowSuggestions(true);
	}

	//Hide suggestions when one is clicked
	const onSuggestionClick = (suggestion, e) => {
		setShowSuggestions(false);
		handleClick(suggestion);
		console.log(showSuggestions);
	}

	return (
		<div className="FormInputSearchField">
			<input required type="text" placeholder={fieldPlaceholderText} value={value} onChange={(e) => onChange(e)} onMouseDown={onInputClick} />
			{suggestions.length > 0 && showSuggestions && (
				<ul className="InputSearchList">
					{suggestions.map((suggestion, index) => (
						<li className="InputSearchElement" key={index} onClick={() => onSuggestionClick(suggestion)}>
							{suggestion.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FormInputSearchField;