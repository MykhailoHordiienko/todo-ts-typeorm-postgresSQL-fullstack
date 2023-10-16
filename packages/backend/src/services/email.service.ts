// eslint-disable-next-line
import nodemailer from 'nodemailer';
import { TypeNodeMailer } from '../types/todos.type';

export default class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_META_USER || 'example@meta.ua',
      pass: process.env.SMTP_META_PASSWORD || 'example'
    }
  });

  async sendVerificationEmail({ verificationToken, email }: TypeNodeMailer) {
    await this.transporter.sendMail({
      from: process.env.SMTP_META_USER || 'cgscamp@meta.ua',
      to: email,
      subject: 'Verify email',
      html: `
              <a target='_blank' href='${process.env.BASE_URL}/user/verify/${verificationToken}'>Click to verify email</a>
          `
    });
  }

  async sendPasswordResetEmail({ verificationToken, email }: TypeNodeMailer) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER || 'antonnode@mail.ru',
      to: email,
      subject: 'Password reset',
      html: `
                  <a target='_blank' href='${process.env.BASE_URL}/user/reset/${verificationToken}'>$Click to verify email</a>
          `
    });
  }
}
