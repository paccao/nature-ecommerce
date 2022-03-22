import { Request, Response } from 'express'
import { dbConnection as conn } from '../server'
import jwt from 'jsonwebtoken'

const loginUser = async (req: Request, res: Response) => {
	const username: string = req.body.username
	const password: string = req.body.password
	console.log([username, password])
	if (!username || !password) {
		return res
			.status(400)
			.json({ success: false, message: 'Missing credentials' })
	}

	const user = { name: username }
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
	return res.status(200).json({ accessToken })
}

export default { loginUser }
