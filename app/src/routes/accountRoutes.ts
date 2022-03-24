import express from 'express'
import controller from '../controllers/account'

const router = express.Router()

router.get('/api/accounts', controller.getSpecificAccount)

export default router
