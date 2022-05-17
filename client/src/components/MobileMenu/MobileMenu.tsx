import React from 'react'
import MobileMenuButton from './MobileMenuButton'
type Props = {
	fixed?: boolean
}

const MobileMenu: React.FC<Props> = (props) => {
	return (
		<>
			<MobileMenuButton fixed />
		</>
	)
}

export default MobileMenu
