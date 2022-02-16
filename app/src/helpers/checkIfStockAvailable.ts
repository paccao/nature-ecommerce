import { dbConnection as conn } from '../server'

export default async function checkIfStockAvailable(
	amountToAdd: number,
	productId: string,
) {
	if (amountToAdd <= 0) return false
	const queryString = 'SELECT stock_available FROM products WHERE id = $1;'

	try {
		const { rows } = await conn.query(queryString, [productId])
		return rows
	} catch (error) {
		return { message: 'Error!', error }
	}
}
