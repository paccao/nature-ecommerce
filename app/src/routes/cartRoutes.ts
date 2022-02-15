import express from 'express'
import controller from '../controllers/cart'

const router = express.Router()

router.post('/api/cart', controller.pushToCart)

export default router
