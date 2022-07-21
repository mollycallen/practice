import React, { useContext, useEffect } from "react";
import { CategoryContext, UserContext } from "../App";
import { capitalizeEachWord } from "./Helper";
import ItemDetail from "./ItemDetail";
import "./Cart.css";

const Cart = () => {
	const [user, , cart, setCart] = useContext(UserContext);
	const [, setActiveCategory] = useContext(CategoryContext);

	useEffect(() => {
		setActiveCategory("Shopping Cart");
	}, []);

	useEffect(() => {}, [cart.length]);

	const getSubTotal = () => {
		let sub = 0;
		cart.map((entry) => (sub += entry.price));
		return sub;
	};
	const getShipping = () => {
		return "Free";
	};
	const removeItemHandler = (uuid) => {
		const temp = [...cart];
		const ind = temp.findIndex((item) => item.uuid === uuid);
		temp.splice(ind, 1);
		setCart(temp);
	};
	return (
		<div className="cart-wrapper">
			<div>
				{user && Object.keys(user).length > 0 && (
					<h2 className="greeting">
						Hello, {capitalizeEachWord(user.name.firstname)}!
					</h2>
				)}
				{cart.length > 0 ? (
					<>
						<table>
							<thead>
								<tr className="table-header">
									<th colSpan={2} className="text-center">
										Item
									</th>

									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item) => (
									<tr key={item.uuid}>
										<td>
											<button
												onClick={() => removeItemHandler(item.uuid)}
												className="remove-btn"
												title="Remove Item"
											>
												X
											</button>
										</td>
										<td>
											<ItemDetail id={item.id} />
										</td>

										<td className="text-right">${item.price.toFixed(2)}</td>
									</tr>
								))}
								<tr>
									<td colSpan={3} className="top-border"></td>
								</tr>
								<tr className="text-right">
									<td colSpan="2">
										<h4>Subtotal:</h4>
									</td>
									<td>${getSubTotal().toFixed(2)}</td>
								</tr>
								<tr className="text-right">
									<td colSpan="2">
										<h4>Shipping:</h4>
									</td>
									<td>{getShipping()}</td>
								</tr>
								<tr className="text-right">
									<td colSpan="2">
										<h4>Total:</h4>
									</td>
									<td>${getSubTotal()}</td>
								</tr>
							</tbody>
						</table>
						<div className="checkout-div">
							<button className="checkout-btn">Checkout</button>
						</div>
					</>
				) : (
					<div className="msg">No items in cart!</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
