import { useQuery } from 'react-query'
import { CartResult } from '../models/Cart'
import { fetchCart } from '../helpers/fetchCart'

export default function useCart() {
	return useQuery<CartResult, Error>('cart', () => fetchCart(), {
		retry: false,
	})
}
