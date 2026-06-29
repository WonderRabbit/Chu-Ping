'use strict';

function uniqueLineBlock(existingBlock, nextLine) {
  var lines = existingBlock.split('\n').filter(Boolean);
  var trimmedNextLine = nextLine.trim();
  var hasLine = lines.some(function (line) {
    return line.trim() === trimmedNextLine;
  });
  if (!hasLine) {
    lines.push(nextLine);
  }
  return lines.join('\n');
}

function replaceMarkerBlock(content, markerName, nextLine) {
  var start = '// generator-chuping:' + markerName + ':start';
  var end = '// generator-chuping:' + markerName + ':end';
  var startIndex = content.indexOf(start);
  var endIndex = content.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    return content;
  }

  var blockStart = startIndex + start.length;
  var existingBlock = content.slice(blockStart, endIndex).trim();
  var updatedBlock = uniqueLineBlock(existingBlock, nextLine);
  return content.slice(0, blockStart) + '\n' + updatedBlock + '\n' + content.slice(endIndex);
}

function updateFile(generator, relativePath, update) {
  var destination = generator.destinationPath(relativePath);
  if (!generator.fs.exists(destination)) {
    return;
  }

  if (generator.conflicter) {
    generator.conflicter.force = true;
  }
  generator.fs.write(destination, update(generator.fs.read(destination)));
}

function registerAction(generator, data) {
  updateFile(generator, 'src/actions/index.js', function (content) {
    return replaceMarkerBlock(content, 'action-exports', "export * from './" + data.fileName + "';");
  });
}

function registerReducer(generator, data) {
  updateFile(generator, 'src/reducers/index.js', function (content) {
    var imported = replaceMarkerBlock(
      content,
      'reducer-imports',
      "import " + data.camelName + "Reducer from './" + data.fileName + "';"
    );
    return replaceMarkerBlock(imported, 'reducer-map', '  ' + data.camelName + ': ' + data.camelName + 'Reducer,');
  });
}

function registerSaga(generator, data) {
  updateFile(generator, 'src/sagas/index.js', function (content) {
    var imported = replaceMarkerBlock(
      content,
      'saga-imports',
      "import " + data.camelName + "Saga from './" + data.fileName + "';"
    );
    return replaceMarkerBlock(imported, 'saga-list', '    ' + data.camelName + 'Saga(),');
  });
}

module.exports = {
  registerAction: registerAction,
  registerReducer: registerReducer,
  registerSaga: registerSaga
};
