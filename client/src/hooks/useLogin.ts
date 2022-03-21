import { useMutation } from 'react-query'
import loginUser from '../helpers/loginUser'

export default function useLogin() {
	return useMutation(loginUser, {
		retry: false,
	})
}
