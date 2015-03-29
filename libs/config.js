/**
 * This module loads the nconf configuration reader
 * and reads a config file.
 * Module exports initialized nconf instance.
 * @type {exports}
 */

var nconf = require('nconf');
nconf.argv()
    .env()
    .file({ file: './config/main.json' });

module.exports = nconf;
