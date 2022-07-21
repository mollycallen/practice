import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../App";
import "./SearchBar.css";

const SearchBar = ({ searchItems }) => {
	const [activeCategory, setActiveCategory] = useContext(CategoryContext);

	const [inputText, setInputText] = useState("");

	const navigate = useNavigate();
	useEffect(() => {}, [inputText]);

	const handleSearch = (e) => {
		e.preventDefault();
		setInputText("");
		setActiveCategory(`Search '${inputText}'`);
		navigate(`/search/${inputText}`);
	};

	return (
		<div className="search-div">
			<form className="search-form" onSubmit={handleSearch}>
				<input
					onChange={(e) => setInputText(e.target.value)}
					value={inputText}
					type="text"
					placeholder="What are you shopping for?"
				></input>

				<button type="submit" className="search-btn">
					<i className="fa-solid fa-magnifying-glass"></i>
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
