/**
 * All credits goes to Matilda Mared @ https://github.com/MatildaMared
 */

import { useState, useEffect } from "react";

/**
 * Programmatically determine the current window width
 */
function useWidth() {
	const [windowWidth, setWindowWidth] = useState<number>(0);
	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowWidth;
}

export default useWidth;