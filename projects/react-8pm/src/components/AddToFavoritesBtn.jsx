import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import "./AddToFavoritesBtn.css";

const AddToFavoritesBtn = ({ id }) => {
	const [, , , , favorites, setFavorites] = useContext(UserContext);
	const [activeFlag, setActiveFlag] = useState(false);

	useEffect(() => {
		favorites.includes(id) ? setActiveFlag(true) : setActiveFlag(false);
	}, []);

	const onClickHandler = (e) => {
		let temp;
		// if already in favorites, remove it
		if (activeFlag) {
			temp = favorites.filter((item) => item !== id);
			setActiveFlag(false);
			// add to favorites
		} else {
			temp = [...favorites, id];
			setActiveFlag(true);
		}
		setFavorites([...temp]);
	};

	return (
		<button
			className="favorites-btn"
			onClick={(e) => {
				onClickHandler(e);
			}}
		>
			<i
				className={`fa-heart ${activeFlag ? "fa-solid active" : "fa-regular"}`}
				title="Add to Favorites"
			></i>
		</button>
	);
};

export default AddToFavoritesBtn;
