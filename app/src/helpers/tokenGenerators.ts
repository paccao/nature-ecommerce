import { sign } from 'jsonwebtoken'

export function generateAccessToken(user: { name: string }) {
	return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15min' })
}

export function generateRefreshToken(user: { name: string }) {
	return sign(user, process.env.REFRESH_TOKEN_SECRET)
}
