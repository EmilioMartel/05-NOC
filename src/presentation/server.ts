import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource(),
  new MongoLogDatasource(),
);

const emailService = new EmailService();

export class Server {
  
  public static start() {

    console.log('Server started...');
    //todo: mandar email
   
    // emailService.sendEmailWithFileSystemLogs(
    //   ['emiliomtg@gmail.com']
    // );
    
    // emailService.sendEmail({
    //   to: 'emiliomtg@gmail.com',
    //   subject: 'prueba de node - logs del sistema',
    //   htmlBody: `
    //   <h3>Logs del sistema - NOC </h3>

    //   <p>Aliqua anim Lorem commodo irure do sint proident ut excepteur deserunt.</p>
    //   <p>Ver logs adjuntos </p>
    //   `
    // });

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       logRepository,
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
    //     // new CheckService().execute("http://localhost:3000");
    //   }
    // );
    
  }


}