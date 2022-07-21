import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const LoginBtn = ({ msg }) => {
	const navigate = useNavigate();
	const [user, setUser] = useContext(UserContext);

	const handleLogin = () => {
		navigate(`/login`);
	};
	return (
		<div className="log-wrapper">
			{msg}{" "}
			<button className="log-btn" onClick={handleLogin}>
				Login
			</button>
		</div>
	);
};

export default LoginBtn;
