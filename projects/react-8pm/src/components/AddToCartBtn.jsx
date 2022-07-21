import React, { useContext } from "react";
import { UserContext } from "../App";
import "./AddToCartBtn.css";
import { v4 as uuidv4 } from "uuid";

const AddToCartBtn = ({ item }) => {
	const [user, setUser, cart, setCart] = useContext(UserContext);
	const addToCartHandler = () => {
		let newCart = [...cart];
		newCart.push({ ...item, uuid: uuidv4() });
		setCart(newCart);
		//console.log("add to cart: ", cart);
	};
	return (
		<>
			<button onClick={addToCartHandler} className="add-cart-btn">
				Add to Cart
			</button>
		</>
	);
};

export default AddToCartBtn;
