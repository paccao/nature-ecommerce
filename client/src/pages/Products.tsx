import useProduct from '../hooks/useProduct'
import ProductItem from '../components/ProductItem/ProductItem'
import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import searchStringState from '../atoms/searchStringState'
import CartAside from '../components/CartAside/CartAside'
import { GlobalWidths } from '../models/Global'
import useWidth from '../hooks/useWidth'
import currentScrollYPosition from '../atoms/scrollYPosition'
import MobileMenuButton from '../components/MobileMenu/MobileMenuButton'

export default function Products() {
	const { data } = useProduct()
	const [filterState, setFilterState] = useRecoilState(searchStringState)
	const pageWidth = useWidth()
	const [scrollYPosition, setScrollYPosition] = useRecoilState(
		currentScrollYPosition,
	)

	const filteredProducts = data?.result?.filter(
		(product) =>
			product.name.toLowerCase().search(filterState.toLowerCase()) != -1,
	)

	function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		setFilterState(event.target.value)
	}

	const renderAllProductItems = data?.result?.map((product) => (
		<ProductItem product={product} key={product.id} />
	))

	const renderfilteredProductItems = filteredProducts?.map((product) => (
		<ProductItem product={product} key={product.id} />
	))

	return (
		<>
			{pageWidth <= 633 && scrollYPosition >= 85 ? (
				<MobileMenuButton />
			) : null}
			<Wrapper>
				{pageWidth > GlobalWidths.Mobile && <CartAside />}
				<ProductsSection>
					<div className="top">
						<h1>Products</h1>
						<SearchForm
							role="search"
							onSubmit={(e) => e.preventDefault()}
						>
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
				</ProductsSection>
			</Wrapper>
		</>
	)
}
const Wrapper = styled.section`
	display: grid;
	grid-template-columns: minmax(300px, 350px) 7fr;

	@media screen and (max-width: 633px) {
		display: grid;
		grid-template-columns: 1fr;
	}

	@media screen and (max-width: 780px) {
		main {
			grid-template-columns: minmax(300px, 350px) 7fr;
		}
	}
`

const ProductsSection = styled.div`
	.top {
		display: flex;
		align-items: baseline;
	}

	ul {
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		margin-top: 1rem;
		gap: 1rem;
	}

	@media screen and (max-width: 633px) {
		.top {
			justify-content: center;
		}
		ul {
			display: grid;
			justify-content: unset;
			justify-items: center;
			grid-template-columns: 1fr;
			grid-auto-rows: auto;
		}
	}
	@media screen and (min-width: 780px) {
		ul {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (min-width: 1150px) {
		ul {
			grid-template-columns: repeat(3, 1fr);
		}
	}
`

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
