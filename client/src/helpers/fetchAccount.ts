import { AccountResult } from '../models/Account'
import apiDomain from './apiDomain'

export const fetchAccount = async (id: string): Promise<AccountResult> =>
	await (await fetch(`${apiDomain()}/api/account/${id}`)).json()
