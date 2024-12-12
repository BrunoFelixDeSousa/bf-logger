declare module 'bf-logger' {
  export enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    DEBUG = 'debug',
  }

  export interface LoggerOptions {
    saveToFile?: boolean;
    filePath?: string;
  }

  export class BFLogger {
    constructor(options?: LoggerOptions);

    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(log: any): void;
  }
}
