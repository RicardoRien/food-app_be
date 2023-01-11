import { Pool } from 'pg'
import { config } from './../config/config'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
// Url de conección
// ¿Como funciona?
// Si tengo una base de dato remota, me daran una URL de
// connección.
// Ej: si tengo una DDBB en DigitalOcean, Amazon, Heroku
// No me darán campo por campo, sino una URL de conección.
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

// Manera sin variables de entorno
/* const pool = new Pool({ */
/*   host: 'localhost', */
/*   port: 5432, */
/*   user: 'ricardo', */
/*   password: 'admin123', */
/*   database: 'my_store', */
/* }) */

const pool = new Pool({ connectionString: URI })

export default pool
