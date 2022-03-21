import express from 'express'
import controller from '../controllers/auth'

const router = express.Router()

router.post('/api/login', controller.loginUser)

export default router
