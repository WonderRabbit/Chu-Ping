'use strict';

const fs = require('fs');
const path = require('path');

function read(root, relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function assertIncludes(root, relativePath, expected) {
  const content = read(root, relativePath);
  if (content.indexOf(expected) === -1) {
    throw new Error(relativePath + ' does not include ' + expected);
  }
}

function assertFile(root, relativePath) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    throw new Error('Missing file: ' + relativePath);
  }
}

function main() {
  const root = process.argv[2];
  if (!root) {
    throw new Error('Usage: node validate-generated-app.js <generated-app-root>');
  }

  const requiredFiles = [
    'package.json',
    'DESIGN.md',
    'webpack.config.js',
    'babel.config.js',
    'src/index.js',
    'src/store/configureStore.js',
    'src/actions/index.js',
    'src/reducers/index.js',
    'src/sagas/index.js',
    'src/components/App.js',
    'src/containers/AppContainer.js'
  ];

  requiredFiles.forEach(function (file) {
    assertFile(root, file);
  });

  const packageJson = JSON.parse(read(root, 'package.json'));
  if (packageJson.engines.node !== '12.8.x') {
    throw new Error('Expected engines.node to be 12.8.x');
  }

  const expectedDependencies = {
    react: '17.0.2',
    redux: '4.2.0',
    'redux-saga': '1.2.3',
    'react-redux': '7.2.9'
  };

  Object.keys(expectedDependencies).forEach(function (name) {
    if (packageJson.dependencies[name] !== expectedDependencies[name]) {
      throw new Error('Unexpected dependency version for ' + name);
    }
  });

  assertIncludes(root, 'src/store/configureStore.js', 'createSagaMiddleware');
  assertIncludes(root, 'src/store/configureStore.js', 'store.runSaga = sagaMiddleware.run');
  assertIncludes(root, 'src/index.js', 'store.runSaga(rootSaga)');
  assertIncludes(root, 'src/sagas/index.js', 'takeLatest');
  assertIncludes(root, 'src/sagas/index.js', 'yield all');
  assertIncludes(root, 'src/actions/index.js', 'FETCH_GREETING_REQUEST');
  assertIncludes(root, 'src/reducers/index.js', 'combineReducers');
  assertIncludes(root, 'src/containers/AppContainer.js', 'connect');

  JSON.parse(read(root, 'package.json'));
  assertIncludes(root, 'webpack.config.js', 'HtmlWebpackPlugin');
  assertIncludes(root, 'webpack.config.js', 'babel-loader');
  assertIncludes(root, 'webpack.config.js', 'module.exports');
  require(path.join(root, 'babel.config.js'));

  console.log('Generated app validation passed for ' + root);
}

main();
