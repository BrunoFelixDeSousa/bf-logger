import * as fs from 'node:fs';
import { LoggerOptions } from './types';
import chalk from 'chalk';
import { formatDate } from './utils/formatDate';

/**
 * Enum for log levels.
 * @enum {string}
 */
enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

/**
 * Logger class for handling log messages with support for file saving and debug formatting.
 */
export class BFLogger {
  /**
   * Determines whether to save logs to a file.
   * @type {boolean}
   * @private
   */
  private saveToFile: boolean;

  /**
   * Path where log files will be saved.
   * @type {string}
   * @private
   */
  private filePath: string;

  /**
   * Creates an instance of Logger.
   *
   * @param {LoggerOptions} [options] - Configuration options for the logger.
   * @param {boolean} [options.saveToFile=false] - If true, logs will be saved to a file.
   * @param {string} [options.filePath='./logs'] - Directory path for saving log files.
   * @throws Will throw an error if `filePath` is provided but `saveToFile` is false.
   */
  constructor(options: LoggerOptions = {}) {
    this.saveToFile = options.saveToFile || false;
    this.filePath = options.filePath || './logs';

    if (!this.saveToFile && !this.filePath) {
      throw new Error(
        chalk.red('filePath must be provided when saveToFile is true.')
      );
    }

    if (this.saveToFile) {
      if (!fs.existsSync(this.filePath)) {
        fs.mkdirSync(this.filePath, { recursive: true });
      }
    }
  }

  /**
   * Formats a log message with a timestamp and log level.
   *
   * @param {LogLevel} level - The level of the log (e.g., info, warn, error, debug).
   * @param {string} message - The message to log.
   * @returns {string} The formatted log message.
   * @private
   */
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = formatDate(new Date());
    return `[${timestamp}]-[${level.toUpperCase()}]: ${message}`;
  }

  /**
   * Formats and prints detailed debug information about an object or value.
   *
   * @param {*} log - The value to debug.
   * @private
   */
  private formatDebug(log: any) {
    let type = typeof log;
    let isArray = Array.isArray(log);
    let isObject = type === 'object' && log !== null && !isArray;
    let isFunction = type === 'function';

    console.log(chalk.magenta.bgMagenta.bold('----- Debug Log -----'));
    console.log(`${chalk.magenta.bold('Type:')} ${chalk.magenta.italic(type)}`);

    if (isArray) {
      console.log(
        `${chalk.magenta.bold('Is Array:')} ${chalk.magenta.italic(isArray)}`
      );
      console.log(
        `${chalk.magenta.bold('Length:')} ${chalk.magenta.italic(log.length)}`
      );
      console.log(
        `${chalk.magenta.bold('Value:')} ${chalk.magenta.italic(
          JSON.stringify(log, null, 2)
        )}`
      );
    } else if (isObject) {
      console.log(
        `${chalk.magenta.bold('Is Object:')} ${chalk.magenta.italic(isObject)}`
      );
      console.log(
        `${chalk.magenta.bold('Keys:')} ${chalk.magenta.italic(
          Object.keys(log).join(', ')
        )}`
      );
      console.log(
        `${chalk.magenta.bold('Value:')} ${chalk.magenta.italic(
          JSON.stringify(log, null, 2)
        )}`
      );
    } else if (isFunction) {
      console.log(
        `${chalk.magenta.bold('Is Function:')} ${chalk.magenta.italic(
          isFunction
        )}`
      );
      console.log(
        `${chalk.magenta.bold('Name:')} ${chalk.magenta.italic(
          log.name || 'anonymous function'
        )}`
      );
      console.log(
        `${chalk.magenta.bold('Function Body:')} ${chalk.magenta.italic(
          log.toString()
        )}`
      );
    } else {
      console.log(
        `${chalk.magenta.bold('Value:')} ${chalk.magenta.italic(log)}`
      );
      if (type === 'string' || type === 'number') {
        console.log(
          `${chalk.magenta.bold('Length:')} ${chalk.magenta.italic(
            log.length || 'N/A'
          )}`
        );
      }
    }
    console.log(chalk.magenta.bgMagenta.bold('----- End Log -----\n'));
  }

  /**
   * Writes a log message to a file.
   *
   * @param {LogLevel} level - The log level.
   * @param {*} log - The log message or object.
   * @private
   */
  private writeToFile(level: LogLevel, log: any): void {
    if (this.saveToFile) {
      const logFile = `${this.filePath}/${level}.txt`;
      fs.appendFileSync(logFile, log + '\n');
    }
  }

  /**
   * Logs a message with the specified log level.
   *
   * @param {LogLevel} level - The log level (info, warn, error, debug).
   * @param {*} message - The message or object to log.
   * @private
   */
  private log(level: LogLevel, message: any): void {
    const isObject = typeof message === 'object' && message !== null;

    const formattedMessage = this.formatMessage(level, message);

    switch (level) {
      case LogLevel.INFO:
        console.log(chalk.blue(formattedMessage));
        break;
      case LogLevel.WARN:
        console.warn(chalk.yellow(formattedMessage));
        break;
      case LogLevel.ERROR:
        console.error(chalk.red(formattedMessage));
        break;
      case LogLevel.DEBUG:
        if (isObject) {
          this.formatDebug(message);
          break;
        }
        console.debug(chalk.magenta(formattedMessage));
        break;
    }
    this.writeToFile(level, formattedMessage);
  }

  /**
   * Logs an info message.
   *
   * @param {string} message - The message to log.
   */
  info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  /**
   * Logs a warning message.
   *
   * @param {string} message - The message to log.
   */
  warn(message: string): void {
    this.log(LogLevel.WARN, message);
  }

  /**
   * Logs an error message.
   *
   * @param {string} message - The message to log.
   */
  error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }

  /**
   * Logs a debug message or object.
   *
   * @param {*} log - The object or value to debug.
   */
  debug(log: any): void {
    this.log(LogLevel.DEBUG, log);
  }
}
