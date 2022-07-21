import React from "react";
import "./Shipping.css";
const Shipping = () => {
	return (
		<div className="shipping-div">
			<h2>Shipping</h2>

			<p>
				Shipping and Handling Standard shipping and handling charges are based
				on the total price of merchandise shipped to each delivery address
				within the 48 contiguous states. Standard Ground Service requires 5-7
				business days. If your delivery is to an International address other
				than Canada, please order by phone so we can give you all the available
				shipping options.
			</p>
			<h3>US Standard and Express Rates</h3>
			<table>
				<tr>
					<th>Order Total</th>
					<th>Standard Shipping</th>
					<th>Express Shipping</th>
				</tr>
				<tr>
					<td>$0-$20.00</td>
					<td>$5.99</td>
					<td>$12.99</td>
				</tr>
				<tr>
					<td>$20.01 - $49.99</td>
					<td>$8.99</td>
					<td>$20.99</td>
				</tr>
				<tr>
					<td>$50 and over</td>
					<td>FREE</td>
					<td>25.99</td>
				</tr>
			</table>
		</div>
	);
};

export default Shipping;
