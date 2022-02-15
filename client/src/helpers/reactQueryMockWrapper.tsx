import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

type Props = {
	children?: ReactNode
}

const queryWrapper = ({ children }: Props) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default queryWrapper
