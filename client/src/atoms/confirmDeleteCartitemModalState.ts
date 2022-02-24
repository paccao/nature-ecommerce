import { atom } from 'recoil'

const isConfirmDeleteOpen = atom({
	key: 'confirmModalDeleteFromCart',
	default: false,
})

export default isConfirmDeleteOpen
