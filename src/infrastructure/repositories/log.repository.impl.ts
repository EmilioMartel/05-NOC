import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitity";
import { LogRepository } from "../../domain/repositories/log.respository";




export class LogRepositoryImpl implements LogRepository {

  
  constructor(
    private readonly logDataSource: LogDataSource,
  ) {}
  
  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog( log );
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs( severityLevel );
  }

}