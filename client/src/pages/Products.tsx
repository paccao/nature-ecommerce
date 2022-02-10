import { useQuery } from 'react-query'
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material'
import { AddShoppingCart } from '@material-ui/icons'
import { PageWrapper } from '../styles/PageWrapper.styles'
import { Product } from '../models/Product'
import { fetchProducts } from '../helpers/products'

export default function Products() {
	const { data, isLoading, error } = useQuery<Product[]>(
		'products',
		fetchProducts,
	)
	console.log(data)
	return <PageWrapper>Products page🐳</PageWrapper>
}
