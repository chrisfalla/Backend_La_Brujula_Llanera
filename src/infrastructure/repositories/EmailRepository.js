import 'dotenv/config';
import IEmailRepository from '../../domain/repositories/IEmailRepository.js';
import nodemailer from "nodemailer";

export default class EmailRepository extends IEmailRepository {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendEmail(to, subject, body) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: body,
        });
    }
}
