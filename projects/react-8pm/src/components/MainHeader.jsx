import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "./MainHeader.css";

const MainHeader = () => {
	const [user, , cart] = useContext(UserContext);

	return (
		<div className="main-header">
			<Link to="/">
				<h1>8pm</h1>
			</Link>
			<div className="shipping-info">
				<span>Free shipping</span> over $50
			</div>
			<div className="phone-info">
				<p>1-800-123-4567</p>
				<p>6am - 8pm EST</p>
			</div>

			<div className="icons">
				{user && Object.keys(user).length !== 0 && (
					<p className="greeting">Hello, {user.name.firstname}</p>
				)}
				<Link className="favorite-icon" to="/favorites">
					<i className="fa-solid fa-heart" title="Go to Favorites"></i>
				</Link>
				<Link to="/login">
					<i title="Login/Logout" className="fa-solid fa-user"></i>
				</Link>
				<Link className="cart-icon" to="/cart">
					<i title="Go to Cart" className="fa-solid fa-basket-shopping"></i>
					{cart.length > 0 && <div className="cart-ct">{cart.length}</div>}
				</Link>
			</div>
		</div>
	);
};

export default MainHeader;
