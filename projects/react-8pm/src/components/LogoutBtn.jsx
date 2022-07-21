import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const LogoutBtn = ({ msg }) => {
	const navigate = useNavigate();
	const [user, setUser] = useContext(UserContext);
	const handleLogout = () => {
		// logout user
		setUser({});
		navigate(`/login`);
		console.log("logging out...");
	};
	return (
		<div className="log-wrapper">
			{msg}{" "}
			<button className="log-btn" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default LogoutBtn;
