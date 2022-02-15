import { useMutation } from 'react-query'
import { CartResult } from '../models/Cart'
import { pushToCart } from '../helpers/pushToCart'
import { ProductToAdd } from '../models/Product'

export function useAddToCart(productToAdd: ProductToAdd) {
	return useMutation<CartResult, Error>(
		'Push to cart',
		() => pushToCart(productToAdd),
		{
			retry: false,
		},
	)
}
