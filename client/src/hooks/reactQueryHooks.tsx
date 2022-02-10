import { useQuery } from 'react-query'

export function useCustomHook(value: unknown = 'custom hook data!') {
	return useQuery('customHook', () => value)
}
