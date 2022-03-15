import { useQuery } from 'react-query'
import { CostResult } from '../models/Cart'
import fetchTotalCost from '../helpers/fetchTotalCost'

export default function useTotalCost() {
	return useQuery<CostResult, Error>('totalCost', () => fetchTotalCost(), {
		retry: false,
	})
}
