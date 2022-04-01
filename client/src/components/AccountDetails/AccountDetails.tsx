import React from 'react'
import temporaryUser from '../../helpers/temporaryUser'
import useAccountDetails from '../../hooks/useAccountDetails'

type Props = {}

function AccountDetails({}: Props) {
	const { data } = useAccountDetails()
	console.log(data)
	return (
		<article>
			{data ? (
				<>
					<h2>{data.account?.name}</h2>
					<p>{data.account?.adress}</p>
				</>
			) : null}
		</article>
	)
}

export default AccountDetails
