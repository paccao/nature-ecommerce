import { atom } from 'recoil'

const isLoggedIn = atom({
	key: 'loggedInState',
	default: 'null',
})

export default isLoggedIn
