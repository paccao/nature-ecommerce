import styled from 'styled-components'
import { Product } from './models/Product'

function App() {
	function isProduct(object: any) {
		if (
			object.name === typeof 'string' &&
			object.price === typeof 123 &&
			object.description === typeof 'string'
		) {
			return true
		} else {
			return false
		}
	}
	const TESTobj = {
		name: 'joel',
		price: 123,
		description: 'test',
	}
	console.log(isProduct(TESTobj))
	return <PageWrapper className="App">Insert content here. 🐳</PageWrapper>
}

const PageWrapper = styled.div`
	display: flex;
	justify-content: center;
`

export default App
