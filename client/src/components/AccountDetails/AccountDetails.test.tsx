import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import AccountDetails from './AccountDetails'
import useAccountDetails from '../../hooks/useAccountDetails'
import { Account } from '../../models/Account'

const { toBeInTheDocument } = require('@testing-library/jest-dom')

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({}),
	}),
) as jest.Mock

jest.mock('../../hooks/useAccountDetails')
const mockedUseAccountDetails = useAccountDetails as jest.Mock<any>

const mockAccount: Account = {
	id: '1234id56',
	name: 'User Usersson',
	username: 'UserUsername',
	adress: 'usergatan 15, 504 60 Borås',
	role: 'user',
}

const queryClient = new QueryClient()

const mockWrapper = () => {
	return render(
		<QueryClientProvider client={queryClient}>
			<AccountDetails />
		</QueryClientProvider>,
	)
}

mockedUseAccountDetails.mockImplementation(() => ({
	data: mockAccount,
}))

describe('AccountDetails component', () => {
	it('renders without crashing', () => {
		mockWrapper()
	})

	it("renders the user's account details", () => {
		mockWrapper()

		render(
			<>
				<h2>{mockAccount.name}</h2>
				<p>{mockAccount.adress}</p>
			</>,
		)

		const name = screen.getByText(mockAccount.name)
		const adress = screen.getByText(mockAccount.adress)

		expect(name).toBeInTheDocument()
		expect(adress).toBeInTheDocument()
	})
})
