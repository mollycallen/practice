import React, { useContext, useState, useEffect } from "react";
import { CategoryContext, UserContext } from "../App";
import { capitalizeFirstLetter } from "./Helper";
import ItemDetail from "./ItemDetail";
import LogoutBtn from "./LogoutBtn";
import "./UserDetail.css";

const UserDetail = () => {
	const [user] = useContext(UserContext);
	const [, setActiveCategory] = useContext(CategoryContext);

	const [orderHistory, setOrderHistory] = useState([]);

	const getHistory = async () => {
		const res = await fetch(`https://fakestoreapi.com/carts/user/${user.id}`);
		const data = await res.json();
		//console.log("history data: ", data);
		setOrderHistory(data);
	};

	useEffect(() => {
		getHistory();
		setActiveCategory("Account Information");
	}, []);

	return (
		<div className="account-container">
			<div className="greeting-div">
				<h2 className="greeting">
					Welcome back, {capitalizeFirstLetter(user.name.firstname)}!
				</h2>
				<LogoutBtn
					className="msg"
					msg={`Not ${capitalizeFirstLetter(user.name.firstname)}?`}
				/>
			</div>
			<h3>Account Information</h3>
			<div className="account-info">
				<div className="header">
					<div className="detail">
						<h4>Contact Info</h4>
						<p>
							{user.name.firstname} {user.name.lastname}
						</p>
						<p className="email">{user.email}</p>
						<p>{user.phone}</p>
					</div>

					<div className="detail">
						<h4>Shipping Address</h4>
						<p>
							{user.address.number} {user.address.street}
						</p>
						<p>{user.address.city}</p>
						<p>{user.address.zipcode}</p>
					</div>
				</div>

				<div className="order-history-container">
					<h4>Order History</h4>
					{orderHistory.length === 0 && (
						<p className="msg">No order history found.</p>
					)}
					<div className="history-grid">
						{orderHistory.length > 0 &&
							orderHistory.map((entry) => (
								<div className="history-item" key={entry.id}>
									<p>Order #: {entry.id.toString().padStart(4, "0")} </p>
									<p>Date: {entry.date.substr(0, 10)}</p>

									<div>
										{entry.products.map((item) => (
											<div key={item.productId} className="item-detail">
												<p className="text-left">Qty: {item.quantity}</p>
												<p>
													<ItemDetail
														key={item.productId}
														id={item.productId}
													/>
												</p>
											</div>
										))}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDetail;
