import { useQuery } from 'react-query'
import { AccountResult } from '../models/Account'
import { fetchAccount } from '../helpers/fetchAccount'

export default function useAccountDetails() {
	return useQuery<AccountResult, Error>('cart', () => fetchAccount(), {
		retry: false,
	})
}
