'use strict';

function copyTemplate(generator, templateName, destinationName, data) {
  generator.fs.copyTpl(
    generator.templatePath(templateName),
    generator.destinationPath(destinationName),
    data
  );
}

module.exports = copyTemplate;
