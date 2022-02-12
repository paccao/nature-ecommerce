import { PageWrapper } from '../styles/PageWrapper.styles'
import { useProduct } from '../hooks/useProduct'
import ProductItem from '../components/ProductItem/ProductItem'
import { FormEventHandler } from 'react'

export default function Products() {
	const { data, isLoading, error } = useProduct()

	function formSubmitHandler(): void {}

	return (
		<PageWrapper>
			<section>
				<section>
					<div>
						<h1>Products</h1>
						<form role="search" onSubmit={formSubmitHandler}>
							<input type="text" placeholder="Filter by name.." />
						</form>
					</div>
					<ul>
						{data?.result &&
							data.result.map((product) => (
								<ProductItem product={product} key={product.id} />
							))}
					</ul>
				</section>
			</section>
		</PageWrapper>
	)
}
