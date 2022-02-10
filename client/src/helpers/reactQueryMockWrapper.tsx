import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

const wrapper = () => (
	<QueryClientProvider client={queryClient}></QueryClientProvider>
)

export default wrapper
