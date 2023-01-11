import { object, string } from "zod"

const email = string()
  .email({ message: "Invalid email address" })
  .min(1, "Must provide an Email")
const password = string().min(4, 'Password too short')

export const createSessionSchema = object({
  body: object({
    email: email,
    password: password,
  })
})
