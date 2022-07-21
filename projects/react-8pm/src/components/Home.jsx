import React, { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../App";
import Feature from "./Feature";
import Loading from "./Loading";
import "./Home.css";

const Home = ({ items }) => {
	const [featuredItems, setFeaturedItems] = useState([]);

	const [, setActiveCategory] = useContext(CategoryContext);

	useEffect(() => {
		setActiveCategory("");
		const temp = [];
		for (let i = 0; i < 4; i++) {
			let index = Math.floor(Math.random() * items.length);
			temp.push(items[index]);
		}
		setFeaturedItems(temp);
	}, []);

	return (
		<>
			{!items && <Loading />}
			{items && (
				<div className="home-div">
					{featuredItems.map((item, index) => (
						<Feature key={index} item={item} />
					))}
				</div>
			)}
		</>
	);
};

export default Home;
