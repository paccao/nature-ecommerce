import { application, Request, Response } from 'express'
import { dbConnection as conn } from '../server'
import jwt from 'jsonwebtoken'
import {
	generateAccessToken,
	generateRefreshToken,
} from '../helpers/tokenGenerators'

const loginUser = async (req: Request, res: Response) => {
	const username: string = req.body.username
	const password: string = req.body.password
	if (!username || !password) {
		return res
			.status(400)
			.json({ success: false, message: 'Missing credentials' })
	}

	const loginQuery = `
	SELECT username, password FROM users
	WHERE users.username = $1
	AND users.password = $2;
	`

	try {
		const { rows } = await conn.query(loginQuery, [username, password])
		const foundUser = rows[0]
		if (!foundUser) {
			return res.status(400).json({
				success: false,
				message: 'Incorrect credentials.',
			})
		}

		if (foundUser.username === username && foundUser.password === password) {
			return res.status(200).json({
				success: true,
			})
		} else {
			return res.status(500).json({
				success: false,
				message: 'Something went wrong, try again later.',
			})
		}
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: 'Incorrect credentials.',
		})
	}
	// const user = { name: username }
	// const accessToken = generateAccessToken(user)
	// const refreshToken = generateRefreshToken(user)

	// res.status(200).cookie('accessToken', accessToken, {
	// 	httpOnly: true,
	// 	sameSite: 'strict',
	// })
	// return res.status(200).cookie('refreshToken', refreshToken, {
	// 	httpOnly: true,
	// 	sameSite: 'strict',
	// })
}

const validateToken = (req: Request, res: Response) => {
	const refreshToken = req.body.token
	if (!refreshToken) return res.sendStatus(401)

	// TODO: Do we have a valid refresh token? (exists in the database)
	// if(!tokensInDatabase.includes(refreshToken)) return res.sendStatus(403)

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err: unknown, user: { name: string }) => {
			if (err) return res.sendStatus(403)

			const accessToken = generateAccessToken({ name: user.name })
		},
	)
}

const invalidateToken = (req: Request, res: Response) => {
	// req.body should include a token that we want to delete
	// TODO: Make this operation a database query
	// ? Delete the req.body.token from the database
	// arr = arr.filter((token) => token !== req.body.token)
}

export default { loginUser, validateToken, invalidateToken }
