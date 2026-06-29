'use strict';

const Generator = require('yeoman-generator');
const copyTemplate = require('../lib/copy-template');
const names = require('../lib/names');
const register = require('../lib/register');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  writing() {
    const data = names.context(this.options.name);
    copyTemplate(this, 'reducer.js', 'src/reducers/' + data.fileName + '.js', data);
    register.registerReducer(this, data);
  }
};
