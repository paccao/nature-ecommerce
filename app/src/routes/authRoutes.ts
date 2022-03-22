import express, { application } from 'express'
import controller from '../controllers/auth'

const router = express.Router()

router.post('/api/auth/login', controller.loginUser)
router.post('/api/auth/token', controller.validateToken)
router.delete('/api/auth/logout', controller.invalidateToken)

export default router
