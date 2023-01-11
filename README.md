# project made with:

<img alt="typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" /> <img alt="node" src="https://img.shields.io/badge/node.js-43853d?style=for-the-badge&logo=node-dot-js&logocolor=white" /> <img alt="express" src="https://img.shields.io/badge/express.js-%43853d.svg?style=for-the-badge&logo=express&logocolor=white" /> <img alt="prisma" src="https://img.shields.io/badge/Prisma-232323?style=for-the-badge&logo=Prisma&logoColor=cl" /> <img alt="PostgreSql" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /> <img alt="JWT" src="https://img.shields.io/badge/JWT-%238A4182?style=for-the-badge&logo=JSON%20web%20tokens" /> <img alt="Docker" src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" /> <img alt="Insomnia" src="https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE" />


### and other tools like:
- Hapi/Boom
- Zod
- Nodemailer

##  how to install
#### ⚠ If something goes wrong try turning off localhost 5432, 3000 and 5050 ⚠

```sh
docker-compose build && docker-compose up -d
```

### endpoints:

| method | definition | endpoint |
| ------ | ------ | ------ |
| get    | find user by ID      | api/v1/user/:id |
| get    | get users            | api/v1/user     |
| post   | create user          | api/v1/user     |
| post   | verify user          | api/v1/user/verify:id/verificationCode |
| post   | forgot password      | api/v1/user/forgotpassword |
| post   | reset password       | api/v1/user/:resetpassword/:id/:passwordResetCode |
|        |                      |                    |
| post   | login                | api/v1/auth/login       |
|        |                      |                    |
| get    | user profile         | api/v1/auth/login       |

### 🚧 Work in progress 🚧
