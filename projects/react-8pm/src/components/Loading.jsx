import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
	return (
		<div className="loading-div">
			<ReactLoading
				type={"spin"}
				color={"darkgray"}
				height={"5%"}
				width={"5%"}
			/>
		</div>
	);
};

export default Loading;
