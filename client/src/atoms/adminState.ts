import { atom } from 'recoil'

const isAdmin = atom({
	key: 'adminState',
	default: false,
})

export default isAdmin
