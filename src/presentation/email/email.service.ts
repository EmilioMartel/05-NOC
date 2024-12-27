import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repositories/log.respository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entitity';


interface SendMailOptions {
  to: string | string [];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

interface Attachement {
  filename: string;
  path: string
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  constructor(
  ){}


  async sendEmail( options: SendMailOptions): Promise<boolean> {

    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      //console.log(sendInformation);
      return true;
    } catch (error) {
      return false;
    }
  }

  sendEmailWithFileSystemLogs( to: string | string []){
    const subject = 'Logs del servidor';
    const htmlBody =  `
      <h3>Logs del sistema - NOC </h3>

      <p>Aliqua anim Lorem commodo irure do sint proident ut excepteur deserunt.</p>
      <p>Ver logs adjuntos </p>
      `;

    const attachements: Attachement[] = [
      {filename: 'logs-all.log', path: './logs/logs-all.log'},
      {filename: 'logs-high.log', path: './logs/logs-high.log'},
      {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
    ];

    return this.sendEmail({
      to, subject, attachements, htmlBody
    });
  }


}