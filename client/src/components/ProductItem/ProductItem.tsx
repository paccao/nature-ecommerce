import styled from 'styled-components'
import { Product } from '../../models/Product'
import ProductItemBottom from '../ProductItemBottom/ProductItemBottom'

type Props = {
	product: Product
}

export default function ProductItem({ product }: Props) {
	return (
		<ProductCard data-testid="product-item">
			<div className="image-root">
				<ImageWrapper>
					<img
						src={product.img_url}
						alt={`Picture of ${product.name} product.`}
						onError={() => 'via.placeholder.com/150'}
					/>
				</ImageWrapper>
			</div>
			<Information>
				<article className="top">
					<h4>{product.name}</h4>
					<p className="amount-in-stock">{`In stock: ${product.stock_available}`}</p>
				</article>
				<p>{product.description}</p>
				<ProductItemBottom product={product} />
			</Information>
		</ProductCard>
	)
}

const ProductCard = styled.section`
	min-width: 200px;
	max-width: 280px;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: ${(props) => props.theme.borderRadius};

	.image-root {
		display: flex;
		flex-grow: 1;
	}
`

const ImageWrapper = styled.div`
	position: relative;
	padding: 1rem 1rem 0.5rem 1rem;
	width: 100%;
	height: fill;
	align-self: center;

	img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}
`
const Information = styled.article`
	margin: 0.5rem 1rem 0rem 1rem;

	.top {
		display: flex;
		justify-content: space-between;
	}
`
