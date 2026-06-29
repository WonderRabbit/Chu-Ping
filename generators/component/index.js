'use strict';

const Generator = require('yeoman-generator');
const copyTemplate = require('../lib/copy-template');
const names = require('../lib/names');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  writing() {
    const data = names.context(this.options.name);
    copyTemplate(this, 'component.js', 'src/components/' + data.pascalName + '.js', data);
  }
};
