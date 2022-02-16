import { useMutation } from 'react-query'
import { pushToCart } from '../helpers/pushToCart'
import { queryClient } from '../index'

export default function useAddToCart() {
	return useMutation(pushToCart, {
		onSuccess: () => {
			queryClient.invalidateQueries(['product'])
		},
		retry: false,
	})
}
