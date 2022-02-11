import { PageWrapper } from '../styles/PageWrapper.styles'
import { useProduct } from '../hooks/useProduct'

export default function Products() {
	const { data, isLoading, error } = useProduct()

	return (
		<PageWrapper>
			<section>
				<span>TEMPORARY LOGO</span>
				<section>
					<div>
						<h1>Products</h1>
						<input type="text" placeholder="Filter by name.." />
					</div>
				</section>
			</section>
		</PageWrapper>
	)
}
