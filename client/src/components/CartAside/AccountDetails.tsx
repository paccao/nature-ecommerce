import React from 'react'
import useAccountDetails from '../../hooks/useAccountDetails'

type Props = {}

function AccountDetails({}: Props) {
	const { data, isSuccess } = useAccountDetails()
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
