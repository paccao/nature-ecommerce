import { useState, useEffect } from "react";

/**
 * Programmatically determine the current window scroll position in the Y axis 
 */
function useWindowPositionY() {
	const [windowPositionY, setWindowPositionY] = useState<number>(0);
	useEffect(() => {
		function handleScroll() {
			setWindowPositionY(window.scrollY);
		}

		window.addEventListener("scroll", handleScroll);

		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return windowPositionY;
}

export default useWindowPositionY;