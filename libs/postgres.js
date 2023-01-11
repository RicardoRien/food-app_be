import { Client } from 'pg'

async function getConnection (_arguments) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'ricardo',
    password: 'admin123',
    database: 'my_store',
  })
  await client.connect()
  return client
}

export default getConnection
