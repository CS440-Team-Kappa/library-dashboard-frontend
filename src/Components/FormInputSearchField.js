import React, {useState, useEffect} from 'react';
const FormInputSearchField = ({ suggestions, fieldPlaceholderText, value, onChange, handleClick }) => {

	return (
		<>
			<input required type="text" placeholder={fieldPlaceholderText} value={value} onChange={(e) => onChange(e)} />
			{suggestions.length > 0 && (
				<ul className="InputSearchList">
					{suggestions.map((suggestion, index) => (
						<li className="InputSearchElement" key={index} onClick={() => handleClick(suggestion)}>
							{suggestion.label}
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default FormInputSearchField;