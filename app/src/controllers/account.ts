import { Request, Response } from 'express'
import { dbConnection as conn } from '../server'

const getSpecificAccount = async (req: Request, res: Response) => {
	const userId = req.headers.id
	if (!userId) {
		res.status(401).json({
			success: false,
			message: 'User to get was not specified.',
		})
	}

	const getSpecificAccountQuery = `
	SELECT id, name, adress, username FROM users WHERE id = $1;
	`

	try {
		const { rows } = await conn.query(getSpecificAccountQuery, [userId])

		res.status(200).json({
			success: true,
			result: rows[0],
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'Something went wrong.',
		})
	}
}

export default { getSpecificAccount }
