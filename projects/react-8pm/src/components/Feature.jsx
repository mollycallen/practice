import React from "react";
import Loading from "./Loading";
import { getStarsArray } from "./Helper";
import "./Feature.css";
import AddToCartBtn from "./AddToCartBtn";
import AddToFavoritesBtn from "./AddToFavoritesBtn";

const Feature = ({ item }) => {
	return (
		<div>
			{item ? (
				<div className="feature-item">
					<AddToFavoritesBtn id={item.id} />
					<h3>Featured Item</h3>
					<h2>{item.title}</h2>
					<div className="item-info">
						<div style={{ marginBottom: "1rem" }}>
							{item.rating && (
								<div>
									{getStarsArray(item.rating.rate)} {item.rating.count} reviews
								</div>
							)}
						</div>
						<img src={item.image} alt={item.title} />
						{item.description}
						{item.price && <h2>${item.price.toFixed(2)}</h2>}
						<AddToCartBtn id={item.id}>Add to Cart</AddToCartBtn>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Feature;
