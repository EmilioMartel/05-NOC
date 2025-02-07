import { CheckServiceMultiple } from "../domain/use-cases";
import { FileSystemDataSource, MongoLogDatasource, PostgresLogDataSource } from "../infrastructure/datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
);

const postresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
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
    //     new CheckServiceMultiple(
    //       [
    //         fsLogRepository,
    //         postresLogRepository,
    //         mongoLogRepository
    //       ],
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
    //   }
    // );
    
  }


}