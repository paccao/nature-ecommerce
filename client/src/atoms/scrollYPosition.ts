import { atom } from 'recoil'

const currentScrollYPosition = atom({
	key: 'scrollYPosition',
	default: 0,
})

export default currentScrollYPosition
