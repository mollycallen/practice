import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { CategoryContext } from "../App";
import { capitalizeEachWord } from "./Helper";
import ItemDetail from "./ItemDetail";
import "./Favorites.css";

const Favorites = () => {
	const [user, setUser, cart, setCart, favorites, setFavorites] =
		useContext(UserContext);
	const [, setActiveCategory] = useContext(CategoryContext);

	useEffect(() => {
		setActiveCategory("Favorites");
		//console.log(favorites);
	}, []);

	const removeHandler = (e, id) => {
		//console.log("favorites:", id);
		let temp = favorites.filter((item) => item !== id);
		setFavorites([...temp]);
	};

	return (
		<div className="favorites-wrapper">
			<div>
				{user && Object.keys(user).length > 0 && (
					<h2 className="greeting">
						Hello, {capitalizeEachWord(user.name.firstname)}!
					</h2>
				)}
			</div>
			<div className="favorites-grid">
				{favorites.length === 0 ? (
					<div className="msg">No favorites found!</div>
				) : (
					<div className="grid-header">Item</div>
				)}

				{favorites.map((id) => (
					<div className="grid-detail" key={id}>
						<button
							onClick={(e) => {
								removeHandler(e, id);
							}}
							className="remove-btn"
						>
							X
						</button>

						<ItemDetail id={id}></ItemDetail>
					</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;
