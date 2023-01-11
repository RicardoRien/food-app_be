import express from 'express'
import UserService from './../services/user.service'
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schemas/user.schema'
import { validatorHandler } from '../middleware/validator.handler'

const router = express.Router()
const service = new UserService()

router.get('/',
  async (_req, res, next) => {
    try {
      const users = await service.find()
      res.json({ data: users })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createUserSchema),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await service.createNewUser(body)
      console.log({ data: newUser })
      res.status(201).json({ data: newUser })
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await service.findById(id)
      res.json({ data: user })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/verify/:id/:verificationCode',
  validatorHandler(verifyUserSchema),
  async (req, res, next) => {
    try {
      const { id, verificationCode } = req.params
      const verifyUser = await service.verifyUser(id, verificationCode)
      res.status(201).json({ data: verifyUser })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/forgotpassword',
  validatorHandler(forgotPasswordSchema),
  async (req, res, next) => {
    try {
      const { email } = req.body
      const userForgotPassword = await service.forgotPassword(email)
      res.status(201).json({ data: userForgotPassword })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/resetpassword/:id/:passwordResetCode',
  validatorHandler(resetPasswordSchema),
  async (req, res, next) => {
    try {
      const { id, passwordResetCode } = req.params
      const { password } = req.body
      const userForgotPassword =
        await service.resetPassword(id, passwordResetCode, password)
      res.status(201).json({ data: userForgotPassword })
    } catch (error) {
      next(error)
    }
  }
)

export default router 
