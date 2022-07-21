import React, { useState, useEffect } from "react";
import "./App.css";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import MainHeader from "./components/MainHeader";
import MainNav from "./components/MainNav";
import Home from "./components/Home";
import Shipping from "./components/Shipping";
import Cart from "./components/Cart";
import Search from "./components/Search";
import Category from "./components/Category";
import Sale from "./components/Sale";
import Login from "./components/Login";
import Favorites from "./components/Favorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const UserContext = React.createContext();
export const CategoryContext = React.createContext();

function App() {

	const [items, setItems] = useState([]);
	const [categories, setCategories] = useState([]);
	const [user, setUser] = useState({});
	const [cart, setCart] = useState([]);
	const [activeCategory, setActiveCategory] = useState("");
	const [favorites, setFavorites] = useState([]);

	let numUsers = 0;

	const getItems = async () => {
		const res = await fetch("https://fakestoreapi.com/products");
		const data = await res.json();
		setItems(data);
	};

	const setNumberUsers = async () => {
		const res = await fetch(`https://fakestoreapi.com/users`);
		const data = await res.json();
		numUsers = data.length;
	}
	const getUser = async (email, pswd) => {
		// ignore the arguements for now
		// just get random user
		if (numUsers === 0) await setNumberUsers();
		const randomUser = Math.floor(Math.random() * numUsers) + 1;
		//console.log('random user: ', randomUser)
		const res = await fetch(`https://fakestoreapi.com/users/${randomUser}`);
		const data = await res.json();
		setUser(data);
		//console.log('user data: ', data);
	}
	const getCatorgies = async () => {
		const res = await fetch("https://fakestoreapi.com/products/categories");
		const data = await res.json();
		setCategories(data);
	};

	useEffect(() => {
		getItems();
		getCatorgies();
		//console.log('user: ', user)
	}, []);

	return (
		<CategoryContext.Provider value={[activeCategory, setActiveCategory]}>
			<UserContext.Provider value={[user, setUser, cart, setCart, favorites, setFavorites]}>
				<Router >
					<div className="App">
						<header>
							<MainHeader />
							<MainNav categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

						</header>
						<div className="active-category">{activeCategory}</div>
						<Routes >
							<Route path="/" exact element={< Home items={items} />} />
							<Route path="/feature" element={<Feature items={items} />} />
							<Route path="/sale" element={<Sale items={items} price={50} />} />
							<Route path="/search/:str" element={<Search items={items} />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/favorites" element={<Favorites />} />
							<Route path="/category/:cat" element={<Category items={items} />} />
							<Route path="/shipping" element={<Shipping />} />
							<Route path="/login" element={<Login getUser={getUser} />} />
						</Routes>
						<Footer categories={categories} />
					</div>
				</Router>
			</UserContext.Provider>
		</CategoryContext.Provider>
	);
}

export default App;
