const nconf = require('nconf');
const path = require('path');

nconf
    .argv()
    .env()
    .file(path.join(__dirname, 'app.json'));

module.exports = nconf;
