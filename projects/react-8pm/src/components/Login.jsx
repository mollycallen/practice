import React, { useContext, useEffect } from "react";
import { UserContext, CategoryContext } from "../App";
import "./Login.css";
import UserDetail from "./UserDetail";

const Login = ({ getUser }) => {
	const [user] = useContext(UserContext);
	const [, setActiveCategory] = useContext(CategoryContext);

	useEffect(() => {
		setActiveCategory("Account Information");
	}, []);
	const handleLogin = (e) => {
		e.preventDefault();
		console.log(
			`logging in user: ${e.target.email.value} ${e.target.pswd.value}`,
		);
		getUser(e.target.email.value, e.target.pswd.value);
	};
	return (
		<>
			{Object.keys(user).length === 0 && (
				<div className="login-container">
					<h2>Sign In</h2>
					<form onSubmit={handleLogin}>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							placeholder="Enter email"
							required
						/>
						<label htmlFor="pswd">Password</label>
						<input
							type="password"
							name="pswd"
							placeholder="Enter password"
							required
						/>
						<button type="submit">Sign In</button>
					</form>
				</div>
			)}
			{user && Object.keys(user).length !== 0 && <UserDetail />}
		</>
	);
};

export default Login;
