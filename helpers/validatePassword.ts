import { User } from '@prisma/client'
import argon2 from "argon2"

export async function validatePassword(hashedPassword: User['password'], userPassword: User['password']) {
  try {
    return await argon2.verify(hashedPassword, userPassword)
  } catch (e) {
    console.error(e, "Could not validate password")
    return false;
  }
}
