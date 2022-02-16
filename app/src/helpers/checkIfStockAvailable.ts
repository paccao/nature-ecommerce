import StockAvailableResult from '../models/stockAvailableResult'
import { dbConnection as conn } from '../server'

export default async function checkIfStockAvailable(
	amountToAdd: number,
	productId: string,
) {
	let result: StockAvailableResult = { success: false, status: 400 }
	if (amountToAdd <= 0) {
		result = {
			success: false,
			message: 'The amount requested to being added was not accepted.',
			status: 400,
		}
		return result
	}
	const queryString = 'SELECT id, stock_available FROM products WHERE id = $1;'

	try {
		const { rows } = await conn.query(queryString, [productId])
		const actualStockAvailable: number = rows[0].stock_available
		if (amountToAdd <= actualStockAvailable) {
			result = {
				success: true,
				status: 200,
				stockAvailable: actualStockAvailable,
			}
			return result
		} else {
			result = {
				success: false,
				status: 400,
				message: 'This product has no stock available.',
				stockAvailable: 0,
			}
			return result
		}
	} catch (error) {
		result = {
			success: false,
			status: 500,
			message: 'Internal server error, try again later.',
			error,
		}
		return result
	}
}
