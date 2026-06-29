'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('project-name', {
      type: String,
      description: 'Generated project package name'
    });

    this.option('skip-install', {
      type: Boolean,
      default: false,
      description: 'Skip dependency installation after generation'
    });
  }

  prompting() {
    const prompts = [];

    if (!this.options['project-name']) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: this.appname.replace(/\s+/g, '-').toLowerCase()
      });
    }

    if (typeof this.options['skip-install'] !== 'boolean') {
      prompts.push({
        type: 'confirm',
        name: 'skipInstall',
        message: 'Skip npm install?',
        default: true
      });
    }

    if (prompts.length === 0) {
      this.answers = {};
      return Promise.resolve();
    }

    return this.prompt(prompts).then(function (answers) {
      this.answers = answers;
    }.bind(this));
  }

  writing() {
    const projectName = this.options['project-name'] || this.answers.projectName;
    const templateData = {
      projectName: projectName || 'sample-saga-app'
    };

    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath('.'),
      templateData,
      {},
      {
        globOptions: {
          dot: true
        }
      }
    );
  }

  install() {
    const skipInstall = this.options['skip-install'] || this.answers.skipInstall;
    if (!skipInstall) {
      this.npmInstall();
    }
  }
};
