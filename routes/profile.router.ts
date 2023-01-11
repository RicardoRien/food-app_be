import express, { Request } from 'express'
import { isAuthenticated3 } from '../middleware/auth.handler'
import UserService from '../services/user.service'

const router = express.Router()
const service = new UserService()


router.get('/',
  isAuthenticated3,
  async (req: Request | any, res, next) => {
    try {
      const { userId } = req.payload;
      const user = await service.findById(userId)
      res.json({ data: user })
    } catch (error) {
      next(error)
    }
  }
)

export default router 
