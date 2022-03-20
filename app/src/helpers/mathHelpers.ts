/**
 * Returns the absolute number of two numbers. The value returned is converted to a negative number if there was a 'negative difference'.
 */
function getDifference({ a, b }: { a: number; b: number }): number {
	if (a > b) {
		return (a - b) * -1
	}
	return (b - a) * 1
}

export { getDifference }
