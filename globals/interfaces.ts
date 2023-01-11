import { ValidRoles } from "./types"

export interface IUser {
  user: {
    id: string
    name: string
    email: string
    password: string
    role: ValidRoles 
    createdAt: Date
    verificationCode: string
    passwordResetCode: string
    verified: Boolean
  }
}
