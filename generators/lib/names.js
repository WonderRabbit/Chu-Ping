'use strict';

function splitWords(value) {
  return String(value || '')
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function camelCase(value) {
  var words = splitWords(value);
  return words
    .map(function (word, index) {
      var lower = word.toLowerCase();
      return index === 0 ? lower : capitalize(lower);
    })
    .join('');
}

function pascalCase(value) {
  return splitWords(value)
    .map(function (word) {
      return capitalize(word.toLowerCase());
    })
    .join('');
}

function constantCase(value) {
  return splitWords(value)
    .map(function (word) {
      return word.toUpperCase();
    })
    .join('_');
}

function fileName(value) {
  return camelCase(value);
}

function context(value) {
  return {
    rawName: String(value || ''),
    fileName: fileName(value),
    camelName: camelCase(value),
    pascalName: pascalCase(value),
    constantName: constantCase(value)
  };
}

module.exports = {
  camelCase: camelCase,
  pascalCase: pascalCase,
  constantCase: constantCase,
  fileName: fileName,
  context: context
};
