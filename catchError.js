const fs = require('fs');
const path = require('path');
const moment = require('moment');
const debug = require('debug')('homework:catchError');

printError = (type, err, logFile) => {
    const msg = [moment().format('Y-MM-DD HH:mm:ss.SS'), type, err.message, err.stack].join(';') + '\n';
    debug(msg);
    fs.appendFileSync(logFile, msg);
};

catchErrorByType = (type, logFile) => {
    process.on(type, err => {
        printError(type, err, logFile);
        process.exit(1);
    });
};

catchError = () => {
    const logFile = path.join(__dirname, 'log.txt');

    catchErrorByType('uncaughtException', logFile);
    catchErrorByType('unhandledRejection', logFile);
};

module.exports = catchError;
