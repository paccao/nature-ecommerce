export default function apiDomain() {
	const { origin } = window.location
	const production = process.env.NODE_ENV === 'production'
	return production ? '' : origin
}
