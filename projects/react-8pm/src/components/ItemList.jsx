import React, { useState, useEffect } from "react";
import Item from "./Item";
import Loading from "./Loading";
import Select from "react-select";
import "./ItemList.css";

const ItemList = ({ items }) => {
	const [magnifyId, setMagnifyId] = useState("");
	const [popupLocation, setPopupLocation] = useState({ x: 0, y: 0 });
	const [sortBy, setSortBy] = useState("Featured");
	const [sortedItems, setSortedItems] = useState([...items]);
	const options = [
		{ value: "Featured", label: "Featured" },
		{ value: "Rating", label: "Rating" },
		{ value: "Price Low", label: "$ - $$$$" },
		{ value: "Price High", label: "$$$$ - $" },
	];

	useEffect(() => {
		sortItems();
		//console.log("mounting item list");
	}, []);

	useEffect(() => {
		//console.log("items changed, resort");
		sortItems();
	}, [items]);

	useEffect(() => {
		//console.log("re-render bc sort by change");
		sortItems();
	}, [sortBy]);

	useEffect(() => {
		//console.log("re-render bc magnify change");
	}, [magnifyId]);

	const handleMagnify = (e, id) => {
		setPopupLocation({ x: e.clientX, y: e.clientY });
		console.log(popupLocation);
		setMagnifyId(id);
	};
	const handleClose = () => {
		setMagnifyId("");
	};

	const sortItems = () => {
		//console.log("sorting by", e.value);
		let temp = [...items];
		switch (sortBy) {
			case "Rating":
				temp.sort((a, b) => {
					return b.rating.rate - a.rating.rate;
				});
				break;
			case "Price Low":
				temp.sort((a, b) => {
					return a.price - b.price;
				});
				break;
			case "Price High":
				temp.sort((a, b) => {
					return b.price - a.price;
				});
				break;
			default:
				// featured
				temp.sort((a, b) => {
					return b.id - a.id;
				});
		}
		//console.log(temp);
		setSortedItems([...temp]);
	};

	const ddStyle = {
		control: (base) => ({
			...base,
			border: "none",
			boxShadow: "none",
		}),
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isFocused ? "#bcbbbb" : null,
				color: "#333333",
			};
		},
	};

	return (
		<div className="items-list-div">
			<div className="sort-div">
				Sort By
				<Select
					options={options}
					styles={ddStyle}
					defaultValue={options[0]}
					onChange={(e) => {
						setSortBy(e.value);
					}}
				/>
			</div>
			<div className="items-container">
				{sortedItems !== null && sortedItems.length > 0 ? (
					sortedItems.map((item) => (
						<Item
							key={item.id}
							item={item}
							onMagnify={(e) => handleMagnify(e, item.id)}
						/>
					))
				) : (
					<Loading />
				)}

				{magnifyId !== "" && (
					<div
						style={{
							top: `'${popupLocation.y}px'`,
							left: `'${popupLocation.x}px'"`,
						}}
						className="large-image-div"
					>
						<button onClick={handleClose} className="close-btn">
							<i className="fa-solid fa-circle-xmark"></i>
						</button>
						<img
							src={
								sortedItems.find((item) => {
									return item.id === magnifyId;
								}).image
							}
						></img>

						<h3>
							{
								sortedItems.find((item) => {
									return item.id === magnifyId;
								}).title
							}
						</h3>
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemList;
