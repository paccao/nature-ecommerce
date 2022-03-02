import React from 'react'
import useAccountDetails from '../../hooks/useAccountDetails'

type Props = {}

function AccountDetails({}: Props) {
	const { data, isSuccess } = useAccountDetails()
	console.log('account data: ', data)
	return (
		<article>
			{isSuccess ? (
				<>
					<h2>{data?.account?.name}</h2>
					<p>{data?.account?.adress}</p>
				</>
			) : null}
		</article>
	)
}

export default AccountDetails
