import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { config } from '../config/default'

export function generateAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret as string, {
    expiresIn: '30m'
  })
}

export function generateRefreshToken(user: User, jti: string) {
  return jwt.sign({
    userId: user.id, jti
  }, config.jwtRefreshSecret as string, {
    expiresIn: '8h'
  })
}

export function generateTokens(user: User, jti: string) {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user, jti)
  return { accessToken, refreshToken }
}
