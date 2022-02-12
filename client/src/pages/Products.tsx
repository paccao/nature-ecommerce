import { PageWrapper } from '../styles/PageWrapper.styles'
import { useProduct } from '../hooks/useProduct'
import ProductItem from '../components/ProductItem/ProductItem'

export default function Products() {
	const { data, isLoading, error } = useProduct()

	console.log(data)

	return (
		<PageWrapper>
			<section>
				<section>
					<div>
						<h1>Products</h1>
						<form role="search">
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
