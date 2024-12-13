import fs from 'fs';

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitity";
import { log } from 'console';




export class FileSystemDataSource implements LogDataSource{

  private readonly logPath = 'logs/';
  private readonly allLogPath     = 'logs/logs-low.log';
  private readonly mediumLogPath  = 'logs/logs-medium.log';
  private readonly highLogPath    = 'logs/logs-high.log';
  
  constructor(){
    this.createLogsFile();
  }

  private createLogsFile = () => {
    if ( !fs.existsSync( this.logPath ) ) {
      fs.mkdirSync( this.logPath );
    }

    [
      this.allLogPath,
      this.mediumLogPath,
      this.highLogPath
    ].forEach (path => {
      if ( fs.existsSync ( path )) return;

      fs.writeFileSync ( path, '' );
    })

  }

  async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJson = `${ JSON.stringify(newLog) }\n`

    fs.appendFileSync( this.allLogPath, logAsJson);

    if( newLog.level === LogSeverityLevel.low ) return;
    
    if( newLog.level === LogSeverityLevel.medium){
      fs.appendFileSync( this.mediumLogPath, logAsJson );
    } else {
      fs.appendFileSync( this.highLogPath, logAsJson );
    }
  }


  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }

}