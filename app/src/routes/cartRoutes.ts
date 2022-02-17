import express from 'express'
import controller from '../controllers/cart'

const router = express.Router()

router.get('/api/cart', controller.getCart)
router.post('/api/cart', controller.pushToCart)

export default router
