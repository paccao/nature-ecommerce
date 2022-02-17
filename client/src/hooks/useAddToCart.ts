import { useMutation, useQueryClient } from 'react-query'
import { pushToCart } from '../helpers/pushToCart'

export default function useAddToCart() {
	const queryClient = useQueryClient()
	return useMutation(pushToCart, {
		onSuccess: () => {
			queryClient.invalidateQueries(['product'])
		},
		retry: false,
	})
}
