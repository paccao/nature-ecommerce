import { atom } from 'recoil'

const isLoggedIn = atom({
	key: 'loggedInState',
	default: 'false',
})

export default isLoggedIn
