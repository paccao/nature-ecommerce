import express from 'express'
import controller from '../controllers/account'

const router = express.Router()

router.get('/api/accounts/:id', controller.getSpecificAccount)
router.post('/api/login', controller.loginUser)

export default router
