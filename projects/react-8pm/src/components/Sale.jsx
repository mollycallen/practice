import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";

const Sale = ({ items, price }) => {
	const [saleItems, setSaleItems] = useState([]);
	useEffect(() => {
		//console.log("getting sale items under", price);
		filterItems();
	}, []);

	const filterItems = () => {
		setSaleItems(items.filter((item) => item.price < price));
	};

	return (
		<ItemList title={`ITEMS under $${price}`} items={saleItems}></ItemList>
	);
};

export default Sale;
