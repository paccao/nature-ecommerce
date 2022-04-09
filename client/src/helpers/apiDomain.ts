export default function apiDomain(): string {
	const production = process.env.NODE_ENV === 'production'
	return production ? '' : 'http://localhost:8080'
}
