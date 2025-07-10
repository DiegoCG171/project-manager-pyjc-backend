import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class MailSenderService {
    private transporter: nodemailer.Transporter;
    private fromEmail: string
    constructor(
        private readonly configService: ConfigService,
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<string>('MAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASSWORD')
            }
        });
        this.fromEmail = this.configService.get<string>('MAIL_FROM');
    }

    async sendRecoveryPasswordEmail(to: string, code: string) {
        try {
            
            const template_path = join(__dirname, 'templates', 'recovery-code.hbs');
            const source = fs.readFileSync(template_path, 'utf-8');
            const compiled = handlebars.compile(source);

            const html = compiled({ code })
            await this.transporter.sendMail({
                from: this.fromEmail,
                to: to,
                subject: 'Codigo de Verificacion',
                html: html
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
