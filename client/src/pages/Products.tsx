import { PageWrapper } from '../styles/PageWrapper.styles'
import { useProduct } from '../hooks/useProduct'
import ProductItem from '../components/ProductItem/ProductItem'
import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import searchStringState from '../atoms/searchStringState'

export default function Products() {
	const { data } = useProduct()
	const [filterState, setFilterState] = useRecoilState(searchStringState)

	const filteredProducts = data?.result?.filter(
		(product) =>
			product.name.toLowerCase().search(filterState.toLowerCase()) != -1,
	)

	function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setFilterState(event.target.value)
	}

	const renderAllProductItems = data?.result?.map((product) => (
		<ProductItem product={product} key={product.id} />
	))

	const renderfilteredProductItems = filteredProducts?.map((product) => (
		<ProductItem product={product} />
	))

	return (
		<PageWrapper>
			<section>
				<section>
					<div>
						<h1>Products</h1>
						<SearchForm role="search">
							<input
								autoFocus
								type="text"
								placeholder="Filter by name.."
								onChange={(e) => onChangeHandler(e)}
							/>
						</SearchForm>
					</div>
					<ul>
						{filterState === ''
							? renderAllProductItems
							: renderfilteredProductItems}
					</ul>
				</section>
			</section>
		</PageWrapper>
	)
}

const SearchForm = styled.form`
	display: flex;
	align-items: center;

	.search-icon {
		margin-left: -2rem;
	}

	input {
		border-radius: 15px;
		height: 2rem;
		border: none;
		margin-left: 0.5rem;
		background-color: ${(props) => props.theme.cardBgColor};
		color: ${(props) => props.theme.textColor};
		padding-left: 0.5rem;
	}
`
