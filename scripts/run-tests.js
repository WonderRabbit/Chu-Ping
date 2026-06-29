'use strict';

const path = require('path');
const Mocha = require('mocha');

const mocha = new Mocha({
  reporter: process.argv.indexOf('--reporter') !== -1
    ? process.argv[process.argv.indexOf('--reporter') + 1]
    : 'spec',
  timeout: 30000
});

mocha.addFile(path.join(__dirname, '..', 'test', 'generator.test.js'));
mocha.run(function (failures) {
  process.exitCode = failures ? 1 : 0;
});
