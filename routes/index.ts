import express from 'express'
import userRouter from './user.router'
import authRouter from './auth.router'
import profileRouter from './profile.router'

function routerApi (app: express.Application): void {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/user', userRouter)
  router.use('/auth', authRouter)
  router.use('/profile', profileRouter)
} 

export default routerApi
