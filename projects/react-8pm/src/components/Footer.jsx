import React, { useContext } from "react";
import { capitalizeEachWord } from "./Helper";
import { NavLink, Link } from "react-router-dom";
import "./Footer.css";
import { CategoryContext } from "../App";

const Footer = ({ categories }) => {
	const [activeCategory, setActiveCategory] = useContext(CategoryContext);

	return (
		<footer>
			<div className="footer-nav">
				<div>
					<h3>Customer Service</h3>
					<p>
						<Link className="nav-item" to="/">
							Forgot Password
						</Link>
					</p>
					<p>
						<Link className="nav-item" to="/shipping">
							Shipping Rates
						</Link>
					</p>
					<p>
						<Link className="nav-item" to="/">
							Return Policy
						</Link>
					</p>
				</div>

				<div>
					<h3>Shopping</h3>
					{categories.map((entry, i) => (
						<p key={i}>
							<NavLink
								onClick={() => setActiveCategory(entry)}
								className="nav-item"
								to={`/category/${entry}`}
							>
								{capitalizeEachWord(entry)}
							</NavLink>
						</p>
					))}
				</div>
				<div>
					<div>
						<h3>My Account</h3>
						<p>
							<NavLink className="nav-item" to="/login">
								Login/Register
							</NavLink>
						</p>
						<p>
							<NavLink className="nav-item" to="/login">
								Order History
							</NavLink>
						</p>
						<p>
							<NavLink className="nav-item" to="/favorites">
								Favorites
							</NavLink>
						</p>
					</div>
				</div>
				<div>
					<h3>Information</h3>
					<p>About</p>
					<p>Coupons</p>
				</div>
			</div>
			<div className="social-icons">
				<i title="Instagram" className="fa-brands fa-instagram"></i>
				<i title="Facebook" className="fa-brands fa-facebook-f"></i>
				<i title="Twitter" className="fa-brands fa-twitter"></i>
				<i title="Pinterest" className="fa-brands fa-pinterest-p"></i>
				<i title="Youtube" className="fa-brands fa-youtube"></i>
			</div>
		</footer>
	);
};

export default Footer;
