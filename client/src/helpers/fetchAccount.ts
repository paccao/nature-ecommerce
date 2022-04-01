import { AccountResult } from '../models/Account'

export const fetchAccount = async (id: string): Promise<AccountResult> =>
	await (await fetch(`http://localhost:8080/api/account/${id}`)).json()
