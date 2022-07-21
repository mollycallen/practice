import React from "react";
import { getStarsArray } from "./Helper";
import "./Item.css";
import AddToCartBtn from "./AddToCartBtn";
import AddToFavoritesBtn from "./AddToFavoritesBtn";

const Item = ({ item, onMagnify }) => {
	return (
		<div className="item-card" key={item.id}>
			<AddToFavoritesBtn id={item.id} />
			<img src={item.image} alt={item.title} />

			<div className="item-info">
				<h4>{item.title}</h4>
				<div style={{ marginBottom: "1rem" }}>
					{getStarsArray(item.rating.rate)} {item.rating.count} reviews
				</div>
				<div>{item.description}</div>
				<div>{item.price && <h4>${item.price.toFixed(2)}</h4>}</div>
			</div>
			<AddToCartBtn item={item}>Add to Cart</AddToCartBtn>
		</div>
	);
};

export default Item;
