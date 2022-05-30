export default function apiDomain(): string {
	const isProduction = process.env.NODE_ENV === 'production'
	return isProduction ? window.origin : 'http://localhost:8080'
}
