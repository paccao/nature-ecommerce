import styled from 'styled-components'
import { Product } from '../../models/Product'

type Props = {
	product: Product
}

export default function ProductItem({ product }: Props) {
	return (
		<ProductCard data-testid="product-item">
			<figcaption id="amount-in-stock">{`In stock: ${product.stock_available}`}</figcaption>
			<img
				src={product.img_url}
				alt={`Picture of ${product.name} product.`}
				onError={() => 'via.placeholder.com/150'}
			/>
			<h4>{product.name}</h4>
			<p>{product.description}</p>
			<div>
				<b>{`${product.price}kr`}</b>
				<span>ICON</span>
			</div>
		</ProductCard>
	)
}

const ProductCard = styled.article`
	position: relative;
	#in-stock {
		position: absolute;
		right: 0;
	}
`
