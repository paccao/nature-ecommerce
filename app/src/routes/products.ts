import express from 'express'
import controller from '../controllers/products'

const router = express.Router()

router.get('/api/products', controller.getProducts)
router.get('/api/products/:id', controller.getSpecificProduct)

export default router
