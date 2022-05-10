import { useState, useEffect } from "react";

/**
 * Programmatically determine the current window height
 */
function useHeight() {
	const [windowHeight, setWindowHeight] = useState<number>(0);
	useEffect(() => {
		function handleResize() {
			setWindowHeight(window.innerHeight);
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowHeight;
}

export default useHeight;