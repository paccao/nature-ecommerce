import express from 'express'
import controller from '../controllers/cart'

const router = express.Router()

router.post('/api/cart', controller.pushToCart)
router.get('/api/cart', controller.getCart)

export default router
