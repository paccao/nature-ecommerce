import { Request, Response } from 'express'
import { dbConnection as conn } from '../server'

const getAccount = (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'api works!',
	})
}

export default { getAccount }
