import { PrismaClient, User } from '@prisma/client'
import boom from '@hapi/boom'
import { v4 as uuidv4 } from 'uuid'
import { hashPassword } from '../helpers/hashPassword'
/* import UserService from './user.service' */
import { validatePassword } from '../helpers/validatePassword'
import { generateTokens } from '../utils/jwt'
/* import boom from '@hapi/boom' */
/* import UserService from './user.service' */
/* import { signJwt } from '../utils/jwt' */

const prisma = new PrismaClient()

/* const service = new UserService() */


class AuthService {

  async addRefreshTokenToWhitelist(data: any) {
    const { jti, refreshToken, userId } = data

    let hashedRefreshToken = await hashPassword(refreshToken).then((value) => {
      const hashedToken: string = value
      return hashedToken
    })

    return prisma.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashedRefreshToken,
        userId
      },
    })
  }

  // Used to check if the token sent by the client is in the database.
  async findRefreshTokenById(id: string) {
    return prisma.refreshToken.findUnique({
      where: { id }
    })
  }

  // soft delete tokens after usage.
  async deleteRefreshToken(id: string) {
    return prisma.refreshToken.update({
      where: { id },
      data: { revoked: true }
    })
  }

  async revokeTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true }
    })
  }


  async login(email: User['email'], password: User['password']) {
    const user = await prisma.user.findUnique({ where: { email } })
    const jti = uuidv4()

    if (!user) {
      throw boom.notFound('Email not found')
    }

    const validPassword = await validatePassword(user.password, password)

    if (!validPassword) {
      throw boom.forbidden('Invalid password!')
    }

    const { accessToken, refreshToken } = generateTokens(user, jti)
    await this.addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id })

    return { accessToken, refreshToken }
  }

}

export default AuthService 
