import { object, string, TypeOf } from "zod"

const id = string({ required_error: "Password is required" })
const name = string()
const email = string().email({ message: "Invalid email address" })
const password = string().min(4, 'Password too short')
const passwordConfirmation = 
  string({ required_error: "Password Confirmation is required" })
  .min(1, 'Password Confirmation is required')
const passwordResetCode = string().min(1)
const role = string()
const verificationCode = string({ required_error: "Verification Code is required" })

export const createUserSchema = object({
  body: object({
    name: name.min(4, 'Name too short'),
    email: email.min(1, 'Email too short'),
    password: password,
    role: role.min(1)
  })
})

export const updateUserSchema = object({
  email: email,
  role: role
})

export const getUserSchema = object({
  email: email.min(1),
})

export const verifyUserSchema = object({
  params: object({
    id: id,
    verificationCode: verificationCode 
  }),
})

export const forgotPasswordSchema = object({
  body: object({
    email: email
  })
})

export const resetPasswordSchema = object({
  params: object({
    id: id,
    passwordResetCode: passwordResetCode
  }),
  body: object({
    password: password,
    passwordConfirmation: passwordConfirmation
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ['passwordConfirmation']
  })
})

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"]
