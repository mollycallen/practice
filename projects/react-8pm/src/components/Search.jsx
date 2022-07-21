import React, { useState, useEffect } from "react";
import Item from "./Item";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

const Search = ({ items }) => {
	let params = useParams();
	const [searchedItems, setSearchedItems] = useState([]);

	useEffect(() => {
		searchItems(params.str);
	}, [params.str]);

	const searchItems = (str) => {
		//console.log("search for ", str);
		const search = items.filter((item) =>
			item.title.toLowerCase().includes(str.toLowerCase().trim()),
		);
		setSearchedItems(search);
	};

	return (
		<ItemList
			title={`Item Search: ${params.str}`}
			items={searchedItems}
		></ItemList>
	);
};

export default Search;
