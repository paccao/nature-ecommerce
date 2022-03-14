import { useMutation, useQueryClient } from 'react-query'
import updateAmountInCart from '../helpers/updateAmountInCart'

export default function useUpdateAmount() {
	const queryClient = useQueryClient()
	return useMutation(updateAmountInCart, {
		onSuccess: () => {
			queryClient.invalidateQueries('product')
			queryClient.invalidateQueries('cart')
		},
		retry: false,
	})
}
