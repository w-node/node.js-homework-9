const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const deleteFile = util.promisify(fs.unlink);
const accessFile = util.promisify(fs.access);

module.exports = {
    readFile,
    writeFile,
    deleteFile,
    accessFile
};