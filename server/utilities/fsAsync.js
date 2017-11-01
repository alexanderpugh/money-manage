const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

module.exports = {
  readFile,
  unlink
};
