import { Product } from '../../models/Product'

type Props = {
	product: Product
}

export default function ProductItem({ product }: Props) {
	return (
		<article>
			<div>
				<p>{product.stock_available}</p>
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
			</div>
		</article>
	)
}
