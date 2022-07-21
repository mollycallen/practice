import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./MainNav.css";
import { CategoryContext } from "../App";

const MainNav = ({ categories }) => {
	const [activeCategory, setActiveCategory] = useContext(CategoryContext);

	useEffect(() => {}, [activeCategory]);

	return (
		<nav className="main-nav">
			<div className="category-nav">
				{categories
					? categories.map((entry) => (
							<NavLink
								onClick={() => setActiveCategory(entry)}
								className={entry === activeCategory ? "active" : ""}
								to={`/category/${entry}`}
								key={entry}
							>
								{entry}
							</NavLink>
					  ))
					: ""}
			</div>
			<div className="search-sale-nav">
				<SearchBar />
				<div className="sale-msg">
					Shop{" "}
					<NavLink
						className={activeCategory === "sale" ? "active" : ""}
						onClick={() => setActiveCategory("items under $50")}
						to="/sale"
					>
						Items
					</NavLink>{" "}
					under $50!
				</div>
			</div>
		</nav>
	);
};

export default MainNav;
