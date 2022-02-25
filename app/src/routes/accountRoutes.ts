import express from 'express'
import controller from '../controllers/account'

const router = express.Router()

router.get('/api/account', controller.getAccount)

export default router
