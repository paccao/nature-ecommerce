/**
 * Returns the absolute number of two numbers. The value returned is converted to a negative number if there was a 'negative difference'.
 */
function getDifference({ a, b }: { a: number; b: number }): {
	absoluteNumber: number
	subtracted: boolean
} {
	if (a > b) {
		return { absoluteNumber: a - b, subtracted: true }
	}
	return { absoluteNumber: b - a, subtracted: false }
}

export { getDifference }
