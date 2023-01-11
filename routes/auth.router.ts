import express from 'express'
import { validatorHandler } from '../middleware/validator.handler'
import AuthService from '../services/auth.service'
import { createSessionSchema } from '../schemas/auth.schema'

const router = express.Router()
const service = new AuthService()

router.post('/login',
  validatorHandler(createSessionSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body
      const token = await service.login(email, password)
      res.json({ data: token })
    } catch (error) {
      next(error)
    }
  }
)


export default router 
