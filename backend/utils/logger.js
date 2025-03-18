
const fs = require('fs');
const path = require('path');
const logDir = path.join(__dirname, '../logs');
const logFilePath = path.join(logDir, 'debug.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function log(message) {
  const timestamp = new Date().toISOString();
  const fullMsg = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, fullMsg);
  console.log(fullMsg); // Also print to terminal
}

module.exports = log;
