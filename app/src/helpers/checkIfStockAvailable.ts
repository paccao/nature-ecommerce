import { dbConnection as conn } from '../server'

export default async function checkIfStockAvailable(
	amountToAdd: number,
	productId: string,
) {
	if (amountToAdd <= 0) return false

	const queryString =
		'SELECT id, stock_available FROM products(id) VALUES($1) WHERE id IN $1 RETURNING stock_available;'

	try {
		const { rows } = await conn.query(queryString, [productId])
		return rows
	} catch (error) {
		return { message: 'Error!', error }
	}
}
