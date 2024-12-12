"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Logger.ts
var Logger_exports = {};
__export(Logger_exports, {
  Logger: () => Logger
});
module.exports = __toCommonJS(Logger_exports);
var import_node_fs = __toESM(require("fs"));
var import_chalk = __toESM(require("chalk"));
var Logger = class {
  constructor(options = {}) {
    this.saveToFile = options.saveToFile || false;
    this.filePath = options.filtePath || "./logs";
    if (this.saveToFile) {
      if (!import_node_fs.default.existsSync(this.filePath)) {
        import_node_fs.default.mkdirSync(this.filePath, { recursive: true });
      }
    }
  }
  formatMessage(level, message) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    return `[${timestamp}] [${level.toUpperCase}]: ${message}`;
  }
  writeToFile(level, message) {
    if (this.saveToFile) {
      const logFile = `${this.filePath}/${level}.txt`;
      import_node_fs.default.appendFileSync(logFile, message + "\n");
    }
  }
  log(level, message) {
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
        console.debug(import_chalk.default.magenta(formattedMessage));
        break;
    }
    this.writeToFile(level, formattedMessage);
  }
  info(message) {
    this.log("info" /* INFO */, message);
  }
  warn(message) {
    this.log("warn" /* WARN */, message);
  }
  error(message) {
    this.log("error" /* ERROR */, message);
  }
  debug(message) {
    this.log("debug" /* DEBUG */, message);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Logger
});
