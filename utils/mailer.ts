import nodemailer, { SendMailOptions } from 'nodemailer'
import config from 'config'

/* async function createTestCreds() { */
/*   const creds = await nodemailer.createTestAccount() */
/*   console.log({creds}) */
/* } */
/* createTestCreds() */

const smtp = config.get<{
  user: string
  pass: string
  host: string
  port: number
  secure: boolean
}>('smtp')

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.error(err, "error sending email")
      return
    }
    console.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
  })
}

export default sendEmail
