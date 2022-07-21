import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

const Category = ({ items }) => {
	let params = useParams();
	const [selectedItems, setSelectedItems] = useState([]);

	const filterItems = () => {
		setSelectedItems([...items.filter((item) => item.category === params.cat)]);
	};

	useEffect(() => {
		//console.log("mounting category");
		filterItems();
	}, []);
	useEffect(() => {
		//console.log("getting items for cat: ", params.cat);
		filterItems();
	}, [params.cat]);

	return (
		<ItemList title={params.cat.toUpperCase()} items={selectedItems}></ItemList>
	);
};

export default Category;
