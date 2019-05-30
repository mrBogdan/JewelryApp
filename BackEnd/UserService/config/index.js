const nconf = require('nconf');
const path = require('path');

nconf
    .argv()
    .env()
    .file(path.join(__dirname, 'app.json'));

const { dir } = path.parse(__dirname);

nconf.set('homeDir', dir);
nconf.set('tmpDir', path.join(dir, 'tmp'));

module.exports = nconf;
