import { User } from '@prisma/client'
import argo2 from 'argon2'

export async function hashPassword(password: User['password']) {
  const hash = await argo2.hash(password)
  return hash 
}
