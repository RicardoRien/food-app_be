export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string
      DB_PASSWORD: string
      DB_HOST: string
      DB_NAME: string
      DB_PORT: string
      API_KEY: number
      JWT_REFRESH_SECRET: string
      JWT_ACCESS_SECRET: string
      PORT: number
      ENV: 'test' | 'dev' | 'prod'
    }
  }
}
