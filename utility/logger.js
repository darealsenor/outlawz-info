const winston = require("winston");
const { combine, timestamp, printf, colorize, prettyPrint } = winston.format;

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
  let color = "";

  // Set color based on log level
  switch (level) {
    case "error":
      color = "\x1b[31m"; // Red
      break;
    case "info":
      color = "\x1b[33m"; // Yellow
      break;
    default:
      color = "\x1b[0m"; // Reset color
  }

  // Apply color to message
  return `${color}[${timestamp}] ${level}: ${message}\x1b[0m`;
});

// Define Winston transports
const consoleTransport = new winston.transports.Console({
  format: combine(colorize(), timestamp(), logFormat),
});

const fileTransport = new winston.transports.File({
  filename: "app.log",
  format: combine(timestamp(), logFormat),
});

// Create Winston logger instance
const logger = winston.createLogger({
  level: "info", // Set the default logging level
  format: combine(timestamp(), logFormat, prettyPrint(), winston.format.splat()),
  transports: [consoleTransport, fileTransport],
});


module.exports = {
    logger
};
