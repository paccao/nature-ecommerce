import { Request, Response } from 'express'
import { dbConnection as conn } from '../server'

const loginUser = async (req: Request, res: Response) => {
	const credentials: { username: string; password: string } = req.body
	console.log(credentials)
}

export default { loginUser }
