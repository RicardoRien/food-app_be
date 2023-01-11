import express from 'express'
import routerApi from './routes/index'
import helmet from 'helmet'
import cors from 'cors'
import { boomErrorHandler, errorHandler, logErrors, ormErrorHandler } from "./middleware/error.handler"

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (_req, res) => {
  res.json('Hello, world!')
})

const whitelist = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:3500'
]

const options = {
  origin: (origin: any, callback: any): void => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'))
    }
  }
}

app.use(helmet())
app.use(cors(options))
app.use(express.json())
routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(ormErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`
    🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀
    🚀 Server running on port: ${PORT}  🚀
    🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀
  `)
})
