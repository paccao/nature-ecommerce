import { useMutation, useQueryClient } from 'react-query'
import removeFromCart from '../helpers/removeFromCart'

export default function useRemoveFromCart() {
	const queryClient = useQueryClient()
	return useMutation(removeFromCart, {
		onSuccess: () => {
			queryClient.invalidateQueries('product')
			queryClient.invalidateQueries('cart')
		},
		retry: false,
	})
}
