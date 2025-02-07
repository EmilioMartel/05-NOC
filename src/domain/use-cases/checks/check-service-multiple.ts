import fs from 'fs';
import path from "path";

import { LogEntity, LogSeverityLevel } from "../../entities/log.entitity";
import { LogRepository } from "../../repositories/log.respository";

interface CheckServiceMultipleUseCase {
  execute( url: string ): Promise<boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = (( error: string ) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

  constructor( 
    private readonly logRepository: LogRepository[],
    private readonly successCallBack: SuccessCallBack,
    private readonly errorCallBack: ErrorCallBack,
   ) {}

  private callLogs( log: LogEntity ){
    this.logRepository.forEach( logRepository => {
      logRepository.saveLog(log);
    });
  }


  public async execute( url: string ): Promise<boolean> {

    try {
      const req = await fetch( url );
    
      if( !req.ok ){
        throw new Error( `Error on check service ${ url }` );
      } 

      const log = new LogEntity({
        message: `Service ${url} working`, 
        level: LogSeverityLevel.low,
        origin: this.getFileName()
      });
      this.callLogs(log);

      this.successCallBack && this.successCallBack();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${ error }`;
      const log = new LogEntity({
        message: errorMessage, 
        level: LogSeverityLevel.high,
        origin: this.getFileName()
      });
      this.callLogs(log);
      this.errorCallBack && this.errorCallBack( errorMessage );
      return false;
    }
  } 

  private getFileName(): string {
    const currentFilePath = __filename;
    const filePath = fs.realpathSync(currentFilePath);
    const currentFileName = path.basename(filePath);

    return currentFileName;
  }


}