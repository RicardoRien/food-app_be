import type { Request, Response, NextFunction } from "express"
import { HttpException } from "../common/http-exception"
import boom from '@hapi/boom'
import { IUser } from "../globals/interfaces"
import { ValidRoles } from "../globals/types"
import { config } from '../config/default'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserService from "../services/user.service"

const service = new UserService()

export function logErrors(
  error: HttpException,
  _request: Request,
  _response: Response,
  next: NextFunction
) {
  console.error(error)
  next(error)
}

export function checkRoles(...roles: Array<ValidRoles>) {
  return (req: IUser, _res: Response, next: NextFunction) => {
    console.log('Look at role: ', req.user)
    const user = req.user
    console.log(roles)
    if (roles.includes(user.role)) {
      next()
    } else {
      next(boom.forbidden(`You don't have the required role to access.`))
    }
  }
}

export function isAuthenticated() {
  return (req: any, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
      next(boom.forbidden(`You don't have the required permissions to access.`))
    } else {
      const token = authorization?.split(' ')[1]!
      const payload = jwt.verify(token, config.jwtAccessSecret as string)
      req.payload = payload
      next()
    }

    next()
  }
}

export async function isAuthenticated2(req: any, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    boom.forbidden(`You don't have the required permissions to access.`)
  }

  try {
    /* const token = authorization?.split(' ')[1]! */
    /* const payload = jwt.verify(token, config.jwtAccessSecret as string) */
    const { id } = req.payload
    const users = await service.findById(id)
    req.payload = users
    return req
  } catch (err) {
    console.log('🚫 Un-Authorized 🚫');
  }

  return next()
}

export function isAuthenticated3(req: Request | any, _res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    boom.forbidden(`You don't have the required permissions to access.`)
  }

  try {

    try {
      const token = authorization?.split(' ')[1]!
      const payload: JwtPayload | string = jwt.verify(token, 'SECRET123')
      req.payload = payload
    }

    catch (ex: any) {
      boom.forbidden(ex.message)
    }
  } catch (err) {
    boom.forbidden('🚫 Un-Authorized 🚫')
  }

  return next();
}
