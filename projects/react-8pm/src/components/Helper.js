import { startTransition } from "react";

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeEachWord(string) {
	const words = string.split(" ");
	const newWords = words.map(word => capitalizeFirstLetter(word));
	return newWords.join(" ");
}
export function getStarsArray(rating) {
	const solidStarClass = "fa-solid fa-star";
	const halfStarClass = 'fa-solid fa-star-half-stroke';
	const emptyStarClass = "fa-regular fa-star"
	let stars = [];
	if (isNaN(rating)) return stars;
	if (rating > 0) {
		for (let i = 0; i < Math.floor(rating); i++) {
			stars.push(<i key={i} className={solidStarClass}></i>)
		}
		if (rating % 1 !== 0) {
			stars.push(<i key={stars.length} className={halfStarClass}></i>)
		}
		while (stars.length < 5) {
			stars.push(<i key={stars.length} className={emptyStarClass}></i>)
		}
	}
	return stars;
}