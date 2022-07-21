import React, { useState, useEffect } from "react";
import "./ItemDetail.css";
import { getStarsArray } from "./Helper";

const ItemDetail = ({ id, location }) => {
	const [item, setItem] = useState({});
	const [showPopup, setShowPopup] = useState(false);
	const [popupLocation, setPopupLocation] = useState({ x: 0, y: 0 });

	const getItem = async () => {
		const res = await fetch(`https://fakestoreapi.com/products/${id}`);
		const data = await res.json();
		setItem(data);
	};

	const showPopupHandler = (e) => {
		setPopupLocation({ x: e.clientX, y: e.clientY });
		//console.log(popupLocation);
		setShowPopup(true);
	};

	useEffect(() => {
		getItem();
	}, []);

	return (
		<>
			<a className="item-detail-link" onClick={(e) => showPopupHandler(e)}>
				{item.title}
			</a>
			{showPopup && (
				<div>
					<div
						style={{
							top: `'${popupLocation.x}px'`,
							left: `'${popupLocation.y}px'`,
						}}
						className="item-detail-popup"
					>
						<button onClick={() => setShowPopup(false)} className="close-btn">
							<i className="fa-solid fa-circle-xmark"></i>
						</button>
						<img src={item.image}></img>
						<div>
							<h3>{item.title}</h3>
							<div className="stars">
								{getStarsArray(item.rating.rate)} {item.rating.count} reviews
							</div>
							<div className="desc">{item.description}</div>
							{item.price && (
								<div className="price">${item.price.toFixed(2)}</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ItemDetail;
