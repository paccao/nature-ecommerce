import React from 'react'
import useAccountDetails from '../../hooks/useAccountDetails'

type Props = {}

function AccountDetails({}: Props) {
	const { data } = useAccountDetails()
	return (
		<article>
			<h2>{data?.account.name}</h2>
			<p>{data?.account.adress}</p>
		</article>
	)
}

export default AccountDetails
