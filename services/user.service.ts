import { PrismaClient, User } from '@prisma/client'
import boom from '@hapi/boom'
import sendEmail from '../utils/mailer'
import { nanoid } from 'nanoid'
import { hashPassword } from '../helpers/hashPassword'
/* import { v4 as uuidv4 } from 'uuid' */
/* import { generateTokens } from '../utils/jwt' */
/* import AuthService from './auth.service' */

const prisma = new PrismaClient()
/* const service = new AuthService() */

class UserService {


  async createNewUser(data: User) {
    const { name, email, password, role } = data
    const hash = await hashPassword(password)


    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role,
      },
      select: { name: true, email: true, role: true, id: true, verificationCode: true, verified: true }
    })

    await sendEmail({
      from: 'test@example.com',
      to: newUser.email,
      subject: 'Please verify you account',
      text: `verification code: ${newUser.verificationCode}. ID: ${newUser.id}`
    })
    return newUser
  }

  async find() { return await prisma.user.findMany() }

  async findById(id: User['id']) {
    const userId = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        verificationCode: true,
        passwordResetCode: true,
        verified: true
      }
    })
    if (!userId) {
      throw boom.notFound('ID not found')
    }
    return userId
  }

  async findByEmail(email: User['email']) {
    const userEmail = await prisma.user.findUnique({ where: { email } })
    if (!userEmail) {
      throw boom.notFound('Email not found')
    }
    return userEmail
  }

  async verifyUser(
    id: User['id'],
    verificationCode: User['verificationCode']
  ) {

    const user = await this.findById(id)
    // const jti = uuidv4()
    // const { accessToken, refreshToken } = generateTokens(user, jti)

    if (user.verified) {
      throw boom.forbidden('User is already verified')
    }

    if (user.verificationCode === verificationCode) {
      // await service.addRefreshTokenToWhitelist({ jti, refreshToken, userId: id })
      const verifiedUser = await prisma.user.update({
        where: { id: id },
        data: { verified: true },
        select: { name: true, email: true, role: true, id: true, verified: true }
      })
      return verifiedUser
    }

    throw boom.forbidden('Could not verify user')
  }

  async forgotPassword(email: User['email']) {
    const user = await this.findByEmail(email)

    if (!user.verified) { throw boom.forbidden('User is not verified') }

    const passwordResetCode = nanoid()

    await prisma.user.update({
      where: { email: email },
      data: { passwordResetCode: passwordResetCode },
    })

    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Reset your password',
      text: `Password reset code: ${passwordResetCode}. ID: ${user.id}`
    })
    console.log(`Password reset code: ${passwordResetCode} / ID: ${user.id}`)
    return 'Password reset code has been send to your email'
  }

  async resetPassword(
    id: User['id'],
    passwordResetCode: string,
    password: User['password']
  ) {
    const user = await this.findById(id)

    if (!user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
      throw boom.badRequest('Could not reset user password')
    }

    const newPasswordHashed = await hashPassword(password)

    await prisma.user.update({
      where: { id: id },
      data: {
        password: newPasswordHashed, passwordResetCode: null
      }
    })
    return 'Successfully updated password'
  }

}

export default UserService 
