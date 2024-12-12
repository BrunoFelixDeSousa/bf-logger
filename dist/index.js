"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/bf-logger.ts
var fs = __toESM(require("fs"));
var import_chalk = __toESM(require("chalk"));

// src/utils/formatDate.ts
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year} - ${date.getHours()}:${date.getMinutes()}:${date.getUTCSeconds()}`;
}

// src/bf-logger.ts
var BFLogger = class {
  /**
   * Determines whether to save logs to a file.
   * @type {boolean}
   * @private
   */
  saveToFile;
  /**
   * Path where log files will be saved.
   * @type {string}
   * @private
   */
  filePath;
  /**
   * Creates an instance of Logger.
   *
   * @param {LoggerOptions} [options] - Configuration options for the logger.
   * @param {boolean} [options.saveToFile=false] - If true, logs will be saved to a file.
   * @param {string} [options.filePath='./logs'] - Directory path for saving log files.
   * @throws Will throw an error if `filePath` is provided but `saveToFile` is false.
   */
  constructor(options = {}) {
    this.saveToFile = options.saveToFile || false;
    this.filePath = options.filePath || "./logs";
    if (!this.saveToFile && !this.filePath) {
      throw new Error(
        import_chalk.default.red("filePath must be provided when saveToFile is true.")
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
  formatMessage(level, message) {
    const timestamp = formatDate(/* @__PURE__ */ new Date());
    return `[${timestamp}]-[${level.toUpperCase()}]: ${message}`;
  }
  /**
   * Formats and prints detailed debug information about an object or value.
   *
   * @param {*} log - The value to debug.
   * @private
   */
  formatDebug(log) {
    let type = typeof log;
    let isArray = Array.isArray(log);
    let isObject = type === "object" && log !== null && !isArray;
    let isFunction = type === "function";
    console.log(import_chalk.default.magenta.bgMagenta.bold("----- Debug Log -----"));
    console.log(`${import_chalk.default.magenta.bold("Type:")} ${import_chalk.default.magenta.italic(type)}`);
    if (isArray) {
      console.log(
        `${import_chalk.default.magenta.bold("Is Array:")} ${import_chalk.default.magenta.italic(isArray)}`
      );
      console.log(
        `${import_chalk.default.magenta.bold("Length:")} ${import_chalk.default.magenta.italic(log.length)}`
      );
      console.log(
        `${import_chalk.default.magenta.bold("Value:")} ${import_chalk.default.magenta.italic(
          JSON.stringify(log, null, 2)
        )}`
      );
    } else if (isObject) {
      console.log(
        `${import_chalk.default.magenta.bold("Is Object:")} ${import_chalk.default.magenta.italic(isObject)}`
      );
      console.log(
        `${import_chalk.default.magenta.bold("Keys:")} ${import_chalk.default.magenta.italic(
          Object.keys(log).join(", ")
        )}`
      );
      console.log(
        `${import_chalk.default.magenta.bold("Value:")} ${import_chalk.default.magenta.italic(
          JSON.stringify(log, null, 2)
        )}`
      );
    } else if (isFunction) {
      console.log(
        `${import_chalk.default.magenta.bold("Is Function:")} ${import_chalk.default.magenta.italic(
          isFunction
        )}`
      );
      console.log(
        `${import_chalk.default.magenta.bold("Name:")} ${import_chalk.default.magenta.italic(
          log.name || "anonymous function"
        )}`
      );
      console.log(
        `${import_chalk.default.magenta.bold("Function Body:")} ${import_chalk.default.magenta.italic(
          log.toString()
        )}`
      );
    } else {
      console.log(
        `${import_chalk.default.magenta.bold("Value:")} ${import_chalk.default.magenta.italic(log)}`
      );
      if (type === "string" || type === "number") {
        console.log(
          `${import_chalk.default.magenta.bold("Length:")} ${import_chalk.default.magenta.italic(
            log.length || "N/A"
          )}`
        );
      }
    }
    console.log(import_chalk.default.magenta.bgMagenta.bold("----- End Log -----\n"));
  }
  /**
   * Writes a log message to a file.
   *
   * @param {LogLevel} level - The log level.
   * @param {*} log - The log message or object.
   * @private
   */
  writeToFile(level, log) {
    if (this.saveToFile) {
      const logFile = `${this.filePath}/${level}.txt`;
      fs.appendFileSync(logFile, log + "\n");
    }
  }
  /**
   * Logs a message with the specified log level.
   *
   * @param {LogLevel} level - The log level (info, warn, error, debug).
   * @param {*} message - The message or object to log.
   * @private
   */
  log(level, message) {
    const isObject = typeof message === "object" && message !== null;
    const formattedMessage = this.formatMessage(level, message);
    switch (level) {
      case "info" /* INFO */:
        console.log(import_chalk.default.blue(formattedMessage));
        break;
      case "warn" /* WARN */:
        console.warn(import_chalk.default.yellow(formattedMessage));
        break;
      case "error" /* ERROR */:
        console.error(import_chalk.default.red(formattedMessage));
        break;
      case "debug" /* DEBUG */:
        if (isObject) {
          this.formatDebug(message);
          break;
        }
        console.debug(import_chalk.default.magenta(formattedMessage));
        break;
    }
    this.writeToFile(level, formattedMessage);
  }
  /**
   * Logs an info message.
   *
   * @param {string} message - The message to log.
   */
  info(message) {
    this.log("info" /* INFO */, message);
  }
  /**
   * Logs a warning message.
   *
   * @param {string} message - The message to log.
   */
  warn(message) {
    this.log("warn" /* WARN */, message);
  }
  /**
   * Logs an error message.
   *
   * @param {string} message - The message to log.
   */
  error(message) {
    this.log("error" /* ERROR */, message);
  }
  /**
   * Logs a debug message or object.
   *
   * @param {*} log - The object or value to debug.
   */
  debug(log) {
    this.log("debug" /* DEBUG */, log);
  }
};

// src/index.ts
var logger = new BFLogger({ saveToFile: true });
var user = {
  name: "bruno",
  idade: 28,
  endereco: {
    rua: "virtoria",
    numero: 184
  }
};
logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
logger.debug("This is a debug message");
logger.debug(user);
